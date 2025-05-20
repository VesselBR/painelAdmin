import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import PrivateRoute from "./routes/privateRoute";

import SignUp from "./pages/login/SignUP/signUp";
 
 
import Empresas from "./pages/home/empresas/empresas";
import AdicionarEmpresas from "./pages/home/adicionarEmpresas/adicionarEmpresas";
import Editar from "./pages/home/edit/edit";
import Visualizar from "./pages/home/visualizar/visualizar";
import Users from "./pages/home/visualizar/users/users";
import ViewUsers from "./pages/home/visualizar/users/viewUsers/viewUsers";
import EditUsers from "./pages/home/visualizar/users/editUsers/editUsers";
import Units from "./pages/home/visualizar/units/units";
import ViewUnits from "./pages/home/visualizar/units/viewUnits/viewUnits";
import EditUnits from "./pages/home/visualizar/units/editUnits/editUnits";
import NiveisDeAcesso from "./pages/home/visualizar/niveisDeAcesso/niveisDeAcesso";
import VisualizarNiveis from "./pages/home/visualizar/niveisDeAcesso/visualizarNiveis/visualizarNiveis";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./pages/styles/styles.css";
import { AuthProvider } from "./contexts/authContext/authContext"; 
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />

          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />          

            <Route path="/empresas" element={<Empresas />} />
            <Route path="/adicionarEmpresas" element={<AdicionarEmpresas />} />
            <Route path="/edit" element={<Editar />} />
            <Route path="/visualizar" element={<Visualizar />} />
            <Route path="/units" element={<Units />} />
            <Route path="/users" element={<Users />} />
            <Route path="/niveisDeAcesso" element={<NiveisDeAcesso />} />
            <Route path="/visualizarNiveis" element={<VisualizarNiveis />} />
            <Route path="/editUnits" element={<EditUnits />} />
            <Route path="/viewUnits" element={<ViewUnits />} />
            <Route path="/editUsers" element={<EditUsers />} />
            <Route path="/viewUsers" element={<ViewUsers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
