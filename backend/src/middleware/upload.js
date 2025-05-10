const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

// Asegúrate de tener la carpeta uploads en la raíz del proyecto:
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = 'imagen-' + Date.now() + ext;
    cb(null, name);
  }
});

module.exports = multer({ storage });
