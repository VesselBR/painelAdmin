import React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="100vh  text-dark text-start p-3">
      <h1>Home</h1>
      <div>
        <button
          className="btn bg-dark text-light"
          onClick={() => navigate("/empresas")}
        >
          Cadastrar Empresa
        </button>
      </div>


    </div>
  );
}
