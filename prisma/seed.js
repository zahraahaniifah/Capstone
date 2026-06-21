const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('Sedang membersihkan database lama...');

  await prisma.peminjaman.deleteMany({});
  await prisma.jadwal.deleteMany({});
  await prisma.lapangan.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Mulai melakukan seeding data realistis...');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash('password123', salt);

  const admin = await prisma.user.create({
    data: {
      nama: 'Admin Lapangan Futsal',
      email: 'admin@futsal.com',
      password: hashPassword,
      no_hp: '081122334455',
      role: 'ADMIN'
    }
  });

  const userBiasa = await prisma.user.create({
    data: {
      nama: 'Caca',
      email: 'caca@gmail.com',
      password: hashPassword,
      no_hp: '081234567890',
      role: 'USER'
    }
  });

  const lapanganA = await prisma.lapangan.create({
    data: {
      nama_lapangan: 'Futsal Arena A (Rumput Sintetis)',
      jenis_lapangan: 'Futsal',
      harga_perjam: 150000
    }
  });

  const lapanganB = await prisma.lapangan.create({
    data: {
      nama_lapangan: 'Basket A (Vynil)',
      jenis_lapangan: 'Basket',
      harga_perjam: 175000
    }
  });

  const tanggalHariIni = new Date('2026-06-17');

  await prisma.jadwal.createMany({
    data: [
      {
        id_lapangan: lapanganA.id_lapangan,
        tanggal: tanggalHariIni,
        hari: 'Rabu',
        jam_mulai: '16:00',
        jam_selesai: '17:00',
        status: 'TERSEDIA'
      },
      {
        id_lapangan: lapanganA.id_lapangan,
        tanggal: tanggalHariIni,
        hari: 'Rabu',
        jam_mulai: '19:00',
        jam_selesai: '20:00',
        status: 'TERSEDIA'
      },
      {
        id_lapangan: lapanganB.id_lapangan,
        tanggal: tanggalHariIni,
        hari: 'Rabu',
        jam_mulai: '20:00',
        jam_selesai: '21:00',
        status: 'TERSEDIA'
      }
    ]
  });

  console.log('Seeding data sukses besar!');
}

main()
  .catch((e) => {
    console.error('Ada error pas seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });