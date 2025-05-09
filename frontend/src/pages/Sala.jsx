import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importar el componente Navbar


const Sala = () => {
  return (
    <div className="sala-page">
      <Navbar />
      <header className="sala-header">
        <h1>Sala</h1>
        <p>Encuentra el sofá perfecto, mesas de centro, y más para tu sala.</p>
      </header>

      {/* Aquí agregarías los muebles de la categoría Sala */}
      <div className="products">
        <div className="product-card">
          <h4>Sofá Moderno</h4>
          <p>$8,499.00</p>
        </div>
        <div className="product-card">
          <h4>Mesa de Centro</h4>
          <p>$2,999.00</p>
        </div>
        <div className="product-card">
          <h4>Recliner</h4>
          <p>$4,199.00</p>
        </div>
      </div>
    </div>
  );
};

export default Sala;
