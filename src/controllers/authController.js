const prisma = require('../lib/prisma.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { nama, email, password, no_hp } = req.body;

    if (!nama || !email || !password || !no_hp) {
        return res.status(400).json({ message: "Semua data wajib diisi!" });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (userExists) {
            return res.status(400).json({ message: "Email sudah terdaftar!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const hitungUser = await prisma.user.count();
        const nomorUrut = String(hitungUser + 1).padStart(2, '0');
        const idBaru = `U${nomorUrut}`; 

        const newUser = await prisma.user.create({
            data: {
                id_user: idBaru, 
                nama,
                email,
                password: hashedPassword,
                no_hp,
                role: "USER"
            }
        });

        res.status(201).json({
            status: "Success",
            message: "User berhasil didaftarkan!",
            data: {
                id: newUser.id_user,
                nama: newUser.nama,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Gagal mendaftarkan user.",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi!" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ message: "Email salah atau tidak terdaftar!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password salah!" });
        }

        res.status(200).json({
            status: "Success",
            message: "Login berhasil! Selamat datang kembali.",
            data: {
                id: user.id_user,
                nama: user.nama,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Terjadi kesalahan pada sistem login.",
            error: error.message
        });
    }
};

module.exports = { register, login };