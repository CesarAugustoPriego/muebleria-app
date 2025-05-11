// backend/src/index.js
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const path      = require('path');
const sequelize = require('./config/database');

// Rutas
const authRoutes       = require('./routes/auth');
const productoRoutes   = require('./routes/producto');
const categoriaRoutes  = require('./routes/categoria');
const modeloRoutes     = require('./routes/modelo');
const carritoRoutes    = require('./routes/carrito');
const direccionRoutes  = require('./routes/direccion');
const metodoRoutes     = require('./routes/metodo');          // <–– archivo stays as 'metodo.js'
const ventaRoutes      = require('./routes/venta');

const app = express();

// Middleware base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Seguridad con Helmet + CORS/ResourcePolicy para imágenes
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'http://localhost:4000'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", 'http://localhost:4000'],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
  })
);

// Servir imágenes correctamente desde /uploads
app.use(
  '/uploads',
  cors(),
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, '..', 'uploads'))
);

// Rutas API
app.use('/api/auth',        authRoutes);           // ✅ Login y registro
app.use('/api/productos',   productoRoutes);       // ✅ Productos
app.use('/api/categorias',  categoriaRoutes);
app.use('/api/modelos',     modeloRoutes);
app.use('/api/carrito',     carritoRoutes);
app.use('/api/direcciones', direccionRoutes);

// Para métodos de pago, mantenemos singular 'metodo.js' pero mount plural path:
app.use('/api/metodos',     metodoRoutes);

app.use('/api/ventas',      ventaRoutes);

// Ruta raíz
app.get('/', (_, res) => res.send('API OK'));

// Conexión y servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión MySQL OK');
    app.listen(4000, () => console.log('🚀 API corriendo en http://localhost:4000'));
  })
  .catch(err => console.error('❌ Error DB:', err));
