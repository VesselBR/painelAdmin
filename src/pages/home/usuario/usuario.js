import React, { useEffect, useState } from "react";
import { getUsers } from "../../../services/apiTest";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getUsers();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Usuários</h2>
      <ul className="list-group">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="list-group-item">
            <strong>{usuario.name}</strong> - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
