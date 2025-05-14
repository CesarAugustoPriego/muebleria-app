require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const path      = require('path');
const { crossOriginResourcePolicy } = require('helmet');
const sequelize = require('./config/database');

// Importa todas tus rutas
const authRoutes       = require('./routes/auth');
const productoRoutes   = require('./routes/producto');
const categoriaRoutes  = require('./routes/categoria');
const modeloRoutes     = require('./routes/modelo');
const carritoRoutes    = require('./routes/carrito');
const direccionRoutes  = require('./routes/direccion');
const metodoRoutes     = require('./routes/metodo');
const ventaRoutes      = require('./routes/venta');
const monitorRoutes    = require('./routes/monitor');

const app = express();

// 1) Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) CORS: solo desde tu React en http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 3) Seguridad con Helmet y política de recursos
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", 'http://localhost:4000'],
      connectSrc: ["'self'", 'http://localhost:3000', 'http://localhost:4000']
    }
  },
  crossOriginEmbedderPolicy: false
}));
// Permitir la carga de recursos (imágenes) desde otros orígenes
app.use(
  crossOriginResourcePolicy({ policy: 'cross-origin' })
);

// 4) Sirve archivos estáticos de /uploads
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'uploads'))
);

// 5) Monta tus rutas bajo /api
app.use('/api/auth',        authRoutes);
app.use('/api/productos',   productoRoutes);
app.use('/api/categorias',  categoriaRoutes);
app.use('/api/modelos',     modeloRoutes);
app.use('/api/carrito',     carritoRoutes);
app.use('/api/direcciones', direccionRoutes);
app.use('/api/metodos',     metodoRoutes);
app.use('/api/ventas',      ventaRoutes);
app.use('/api/monitor',     monitorRoutes);

// 6) Ruta raíz de comprobación
app.get('/', (_, res) => res.send('API OK'));

// 7) Conecta a la base de datos y levanta el servidor
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
