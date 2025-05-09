require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');

const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/auth', authRoutes);

app.get('/', (_, res) => res.send('API OK'));

sequelize.authenticate()
  .then(() => {
    console.log('Conexión MySQL OK');
    app.listen(4000, () => console.log('API en puerto 4000'));
  })
  .catch(err => console.error('Error DB:', err));
