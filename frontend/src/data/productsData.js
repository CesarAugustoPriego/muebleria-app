// Datos de productos por categoría y modelo
import alacena1 from '../assets/img/alacena1.jpg';
import alacena2 from '../assets/img/alacena2.jpg';
import alacena3 from '../assets/img/alacena3.jpg';
import alacena4 from '../assets/img/alacena4.jpg';
import alacena5 from '../assets/img/alacena5.jpg';
import alacena6 from '../assets/img/alacena6.jpg';

export const productos = {
  cocina: {
    alacenas: [
      { id: 'alc1', image: alacena1, name: 'Alacena Clásica', price: 3500 },
      { id: 'alc2', image: alacena2, name: 'Alacena Blanca', price: 4200 },
      { id: 'alc3', image: alacena3, name: 'Alacena con Vidrio', price: 4800 },
      { id: 'alc4', image: alacena4, name: 'Alacena de Madera', price: 5100 },
      { id: 'alc5', image: alacena5, name: 'Alacena Moderna', price: 5700 },
      { id: 'alc6', image: alacena6, name: 'Alacena Alta', price: 6300 },
    ],
  },
  // Agrega aquí otros cat → modelo → array de productos
};
