import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import PrivateRoute from "./routes/privateRoute";
import Cadastro from "./pages/home/cadastro/cadastro";
 
 
import Empresas from "./pages/home/empresas/empresas";
import AdicionarEmpresas from "./pages/home/adicionarEmpresas/adicionarEmpresas";
import EditarEmpresas from "./pages/home/editarEmpresas/editarEmpresas";
import VisualizarEmpresas from "./pages/home/visualizarEmpresas/visualizarEmpresas";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./pages/styles/styles.css";
import { AuthProvider } from "./contexts/authContext/authContext"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer /> {/* Envolva o conteúdo com o AuthProvider */}
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
 
 
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/adicionarEmpresas" element={<AdicionarEmpresas />} />
            <Route path="/editarEmpresas" element={<EditarEmpresas />} />
            <Route path="/visualizarEmpresas" element={<VisualizarEmpresas />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
