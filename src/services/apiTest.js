// services/apiTest.js
import axios from "axios";

const url = "https://sistema-salao-proud-shape-889.fly.dev/api";

const apiTest = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET - Buscar lista de usuários
export const getUsers = () => apiTest.get("/tenants");

// POST - Criar novo usuário (ou empresa, ou outro recurso)
export const createUser = (data) => apiTest.post("/tenants", data);

// PUT - Atualizar um usuário específico pelo ID
export const updateUser = (id, data) => apiTest.put(`/tenants/${id}`, data);

// DELETE - Excluir um usuário específico pelo ID
export const deleteUser = (id) => apiTest.delete(`/tenants/${id}`);
