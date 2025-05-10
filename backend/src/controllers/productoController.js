const Producto = require('../models/Producto');

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, existencia, fk_categoria, fk_modelo } = req.body;
    if (!req.file) return res.status(400).json({ msg: 'Falta imagen' });

    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precio_unitario: parseFloat(precio),
      existencia: parseInt(existencia),
      fk_categoria: parseInt(fk_categoria),
      fk_modelo: parseInt(fk_modelo),
      imagen_url: `/uploads/${req.file.filename}`
    });

    res.status(201).json({ producto: nuevo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

exports.obtenerProductos = async (_req, res) => {
  try {
    const todos = await Producto.findAll();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

// ...importaciones previas
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const borrados = await Producto.destroy({ where: { id } });
    if (borrados === 0) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    // opcional: también borrar el archivo físico, si quieres:
    // const imagenPath = path.join(__dirname, '..', '..', 'uploads', filenameFromDB);
    // fs.unlinkSync(imagenPath);

    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};

