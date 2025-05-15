require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const path      = require('path');
const sequelize = require('./config/database');

const authRoutes      = require('./routes/auth');
const productoRoutes  = require('./routes/producto');
const carritoRoutes   = require('./routes/carrito');
const direccionRoutes = require('./routes/direccion');
const metodoRoutes    = require('./routes/metodo');
const ventaRoutes     = require('./routes/venta');
const monitorRoutes   = require('./routes/monitor');
const categoriaRoutes = require('./routes/categoria');
const modeloRoutes    = require('./routes/modelo');

const app = express();

// 1) Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) Logging simple de todas las peticiones
app.use((req, res, next) => {
  console.log(`→ [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3) CORS general para tu frontend
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type','Authorization']
}));

// 4) Helmet con CSP y permisos para recursos cross-origin
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:   ["'self'"],
      scriptSrc:    ["'self'", "'unsafe-inline'"],
      styleSrc:     ["'self'", "'unsafe-inline'"],
      imgSrc:       ["'self'", 'http://localhost:4000'],
      connectSrc:   ["'self'", 'http://localhost:3000', 'http://localhost:4000']
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 5) Servir /uploads con CORS abierto (para imágenes)
app.use(
  '/uploads',
  // permite que cualquier origen (frontend, Postman, etc.) consuma estas rutas
  cors({ origin: '*' }),
  express.static(path.join(__dirname, '..', 'uploads'))
);

// 6) Montar rutas de tu API
app.use('/api/auth',       authRoutes);
app.use('/api/producto',  productoRoutes);
app.use('/api/carrito',    carritoRoutes);
app.use('/api/direcciones',direccionRoutes);
app.use('/api/metodos',    metodoRoutes);
app.use('/api/ventas',     ventaRoutes);
app.use('/api/monitor',    monitorRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/modelos', modeloRoutes);

// 7) Ruta de comprobación
app.get('/', (_, res) => res.send('API OK'));

// 8) Conectar y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión MySQL OK');
    app.listen(4000, () =>
      console.log('🚀 API corriendo en http://localhost:4000')
    );
  })
  .catch(err => {
    console.error('❌ Error conectando a la base de datos:', err);
    process.exit(1);
  });
