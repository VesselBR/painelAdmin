// services/apiTenants.js
import axios from "axios";

const url = "https://sistema-salao-proud-shape-889.fly.dev/api";

const apiTenants = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

//TENANTS
// GET - Buscar lista das Empresas
export const getUsers = () => apiTenants.get("/tenants");

// POST - Criar novo usuário (ou empresa, ou outro recurso)
export const createUser = (data) => apiTenants.post("/tenants", data);

// PUT - Atualizar um usuário específico pelo ID
export const updateUser = (id, data) => apiTenants.put(`/tenants/${id}`, data);

// DELETE - Excluir um usuário específico pelo ID
export const deleteUser = (id) => apiTenants.delete(`/tenants/${id}`);



// SHOPS === UNIDADES
export const getShops = (id) => apiTenants.get(`/tenants/${id}/shops`);

export const createShops = (id,data) => apiTenants.post(`/tenants/${id}/shops`, data);

export const updateShops = (id , data) => apiTenants.put(`/tenants/${id}/shops`, data);

export const deleteShop = (id, data) => apiTenants.delete(`/tenants/${id}/shops`, data);


// ROLES === NIVEIS DE ACESSO
export const getRoles = (id) => apiTenants.get(`tenants/${id}/roles`)

export const createRoles = (id, data) => apiTenants.post(`tenants${id}/roles`, data)

export const updateRoles = (id, data) => apiTenants.put(`tenants/${id}/roles`, data)

export const deleteRoles = (id) =>  apiTenants.delete(`tenants/${id}/roles`);

//USUARIOS
export const getUsuarios = (id) => apiTenants.get(`tenants/${id}/users`)

export const createUsuarios = (id, data) =>  apiTenants.post(`tenants/${id}/users`, data);

export const updateUsuarios = (id, data) =>  apiTenants.put(`tenants/${id}/users`, data);

export const deleteUsuarios = (id) => apiTenants.delete(`tenants/${id}/users`);
