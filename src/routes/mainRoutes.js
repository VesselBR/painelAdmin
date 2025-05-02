import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import PrivateRoute from "./privateRoute";
import Cadastro from "../pages/home/cadastro/cadastro";
import Perfil from "../pages/home/perfil/perfil";
import Empresas from "../pages/home/empresas/empresas";
import PrivateLayout from "../contexts/drawerContext/privateLayout";
import AdicionarEmpresas from "../pages/home/adicionarEmpresas/adicionarEmpresas";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <PrivateLayout>
              <Home />
            </PrivateLayout>
          }
        />
        <Route
          path="/empresa"
          element={
            <PrivateLayout>
              <Perfil />
            </PrivateLayout>
          }
        />

        <Route
          path="/cadastro"
          element={
            <PrivateLayout>
              <Cadastro />
            </PrivateLayout>
          }
        />
        <Route
          path="/empresas"
          element={
            <PrivateLayout>
              <Empresas />
            </PrivateLayout>
          }
        />
      </Route>
    </Routes>
  );
}
