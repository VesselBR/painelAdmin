import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import PrivateRoute from "./routes/privateRoute";

import SignUp from "./pages/login/SignUP/signUp";
 
 
import Tenants from "./pages/home/tenants/tenants";
import AddTenants from "./pages/home/addTenants/addTenants";
import Editar from "./pages/home/edit/edit";
import Visualizar from "./pages/home/visualizar/visualizar";
import Users from "./pages/home/visualizar/users/users";
import ViewUsers from "./pages/home/visualizar/users/viewUsers/viewUsers";
import EditUsers from "./pages/home/visualizar/users/editUsers/editUsers";
import Units from "./pages/home/visualizar/units/units";
import ViewUnits from "./pages/home/visualizar/units/viewUnits/viewUnits";
import EditUnits from "./pages/home/visualizar/units/editUnits/editUnits";
import NiveisDeAcesso from "./pages/home/visualizar/niveisDeAcesso/niveisDeAcesso";
import ViewNiveis from "./pages/home/visualizar/niveisDeAcesso/viewNiveis/viewNiveis";
import EditNiveis from "./pages/home/visualizar/niveisDeAcesso/editNiveis/editNiveis";
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

            <Route path="/tenants" element={<Tenants />} />
            <Route path="/addTenants" element={<AddTenants />} />
            <Route path="/edit" element={<Editar />} />
            <Route path="/visualizar" element={<Visualizar />} />
            <Route path="/units" element={<Units />} />
            <Route path="/users" element={<Users />} />
            <Route path="/niveisDeAcesso" element={<NiveisDeAcesso />} />
            <Route path="/viewNiveis" element={<ViewNiveis />} />
            <Route path="/editUnits" element={<EditUnits />} />
            <Route path="/viewUnits" element={<ViewUnits />} />
            <Route path="/editUsers" element={<EditUsers />} />
            <Route path="/viewUsers" element={<ViewUsers />} />
            <Route path="/editNiveis" element={<EditNiveis />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
