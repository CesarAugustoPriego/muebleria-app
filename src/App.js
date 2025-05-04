import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage'; // Importa el CatalogPage
import Sala from './pages/Sala'; // Necesitarás crear estas páginas
import CamasPage from './pages/CamasPage';      // Ruta de la página de camas
import LiterasPage from './pages/LiterasPage';  // Importa la página de literas
import EscritoriosPage from './pages/EscritoriosPage';  // Importa la página de literas
import ArmariosPage from './pages/ArmariosPage';
import TocadoresPage from './pages/TocadoresPage'; // Agregar TocadoresPage
import SofasPage from './pages/SofasPage'; // Agregar TocadoresPage
import MesasDeCentroPage from './pages/MesasDeCentroPage'; // Agregar TocadoresPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} /> {/* Ruta para el catálogo */}
        <Route path="/sala" element={<Sala />} />
        <Route path="/camas" element={<CamasPage />} /> {/* Página de camas */}
        <Route path="/literas" element={<LiterasPage />} /> {/* Ruta de literas */}
        <Route path="/escritorios" element={<EscritoriosPage />} /> {/* Ruta de literas */}  
        <Route path="/armarios" element={<ArmariosPage />} />
        <Route path="/tocadores" element={<TocadoresPage />} />
        <Route path="/sofas" element={<SofasPage />} />
        <Route path="/mesas-centro" element={<MesasDeCentroPage />} />
      </Routes>
    </Router>
  );
}

export default App;
