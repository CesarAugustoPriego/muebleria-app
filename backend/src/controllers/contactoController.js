// backend/src/controllers/contactoController.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:     process.env.SMTP_HOST,
  port:     Number(process.env.SMTP_PORT),
  secure:   process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.enviarContacto = async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    await transporter.sendMail({
      from:    `"Mueblerías Danny" <${process.env.SMTP_USER}>`,
      to:      process.env.ADMIN_EMAIL,
      subject: `Contacto: ${asunto}`,
      html: `
        <p><strong>Nombre:</strong>  ${nombre}</p>
        <p><strong>Correo:</strong>  ${correo}</p>
        <p><strong>Asunto:</strong>  ${asunto}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje}</p>
      `
    });

    res.status(200).json({ ok: true, msg: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ ok: false, msg: 'No fue posible enviar el mensaje.' });
  }
};
