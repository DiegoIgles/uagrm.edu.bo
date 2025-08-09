import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardLayout from './pages/Dashboard';
import DatosPersonales from './pages/DatosPersonales';
import Historico from './pages/Historico';
import AvanceAcademico from './pages/AvanceAcademico';
import BoletaInscripcion from './pages/BoletaInscripcion'; // ✅ NUEVA IMPORTACIÓN
import NotasSemestrales from "./pages/NotasSemestrales";
import NotasResultado from "./pages/NotasResultado";
import Mantenimiento from "./pages/Mantenimiento";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas dentro del layout del dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DatosPersonales />} />
          <Route path="historico" element={<Historico />} />
          <Route path="avance-academico" element={<AvanceAcademico />} />
          <Route path="boleta" element={<BoletaInscripcion />} /> {/* ✅ NUEVA RUTA */}
          <Route path="notas" element={<NotasSemestrales />} /> {/* ✅ NUEVA RUTA */}
          <Route path="notas-resultado" element={<NotasResultado />} />
          <Route path="mantenimiento" element={<Mantenimiento />} />  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
