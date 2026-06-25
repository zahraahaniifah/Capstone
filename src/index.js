const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRoutes = require('./routes/api.js');

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Server Backend Capstone Neo Siap Tempur!');
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Server berhasil menyala dengan sukses!`);
  console.log(` Berjalan di url: http://localhost:${PORT}`);
  console.log(`=========================================`);
});