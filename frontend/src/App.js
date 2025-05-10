import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage'; 
import Sala from './pages/Sala'; 
import CamasPage from './pages/CamasPage';    
import LiterasPage from './pages/LiterasPage';  
import EscritoriosPage from './pages/EscritoriosPage';  
import ArmariosPage from './pages/ArmariosPage';
import TocadoresPage from './pages/TocadoresPage'; 
import SofasPage from './pages/SofasPage'; 
import MesasDeCentroPage from './pages/MesasDeCentroPage'; 
import LibrerosPage from './pages/LibrerosPage'; 
import CentrosEntretenimientoPage from './pages/CentrosEntretenimientoPage'; 
import ComedoresPage from './pages/ComedoresPage';
import CocinasPage from './pages/CocinasPage'; 
import AlacenasPage from './pages/AlacenasPage'; 
import CarritoPage from './pages/CarritoPage'; 
import AgregarProducto from './adminPages/AgregarProducto';
import DashboardAdmin from './adminPages/DashboardAdmin';
import MisComprasPage from './pages/MisComprasPage';
import ProductosAdmin from './adminPages/ProductosAdmin';


import PrivateRoute from './routes/PrivateRoute'; // 👈 asegúrate de tener este archivo creado
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/camas" element={<CamasPage />} />
        <Route path="/literas" element={<LiterasPage />} />
        <Route path="/escritorios" element={<EscritoriosPage />} />
        <Route path="/armarios" element={<ArmariosPage />} />
        <Route path="/tocadores" element={<TocadoresPage />} />
        <Route path="/sofas" element={<SofasPage />} />
        <Route path="/mesas-centro" element={<MesasDeCentroPage />} />
        <Route path="/libreros" element={<LibrerosPage />} />
        <Route path="/centros-entretenimiento" element={<CentrosEntretenimientoPage />} />
        <Route path="/comedores" element={<ComedoresPage />} />
        <Route path="/cocinas-integrales" element={<CocinasPage />} />
        <Route path="/alacenas" element={<AlacenasPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/mis-compras" element={<MisComprasPage />} />

        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/agregar-producto" element={<AgregarProducto />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/productos" element={<ProductosAdmin />} />
        </Route>
      </Routes>

  
    </Router>
  );
}


export default App;
