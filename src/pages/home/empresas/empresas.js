import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cnpj } from "cpf-cnpj-validator";
import axios from "axios";
import { getUsers } from "../../../services/apiTenants";
import * as bootstrap from "bootstrap";
import { Spinner } from "react-bootstrap";

import Table from "../../../components/Table/table";

// const empresas = [
//   {
//     id: 1,
//     name: "EmpresaA",
//     created_at: "2024-02-13T20:17:08.000-03:00",
//     updated_at: "2024-02-13T20:17:08.000-03:00",
//     document: "54.122.711/0001-68",
//     replicate_services: true,
//     replicate_products: true,
//     replicate_payments: null,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 2,
//     name: "Teste.A",
//     created_at: "2024-02-14T09:44:30.827-03:00",
//     updated_at: "2024-02-14T09:44:30.827-03:00",
//     document: "92.269.507/0001-63",
//     replicate_services: true,
//     replicate_products: true,
//     replicate_payments: null,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 3,
//     name: "Empresa do Eduardo",
//     created_at: "2024-03-04T21:33:46.104-03:00",
//     updated_at: "2024-03-04T21:33:46.104-03:00",
//     document: "13.859.196/0001-16",
//     replicate_services: true,
//     replicate_products: true,
//     replicate_payments: null,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 4,
//     name: "Empresa Nova ",
//     created_at: "2024-04-16T16:28:27.825-03:00",
//     updated_at: "2024-04-16T16:28:27.825-03:00",
//     document: "42.124.423/0001-63",
//     replicate_services: true,
//     replicate_products: true,
//     replicate_payments: null,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 5,
//     name: "Estoque",
//     created_at: "2024-07-30T16:29:31.797-03:00",
//     updated_at: "2024-07-30T16:29:31.797-03:00",
//     document: "62.381.518/0001-70",
//     replicate_services: false,
//     replicate_products: false,
//     replicate_payments: false,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 6,
//     name: "TESTE 1",
//     created_at: "2024-09-02T09:48:16.034-03:00",
//     updated_at: "2024-09-02T09:48:16.034-03:00",
//     document: "01.364.505/0001-06",
//     replicate_services: false,
//     replicate_products: false,
//     replicate_payments: false,
//     shop_dc_id: null,
//     active: true,
//     userlimit: null,
//     module_customer: null,
//     module_admin: null,
//     module_service: null,
//     module_product: null,
//     module_stock: null,
//     module_finance: null,
//     module_fiscal: null,
//     module_cashier: null,
//     module_staff: null,
//     module_agenda: null,
//   },
//   {
//     id: 7,
//     name: "Teste2",
//     created_at: "2025-04-14T16:08:29.278-03:00",
//     updated_at: "2025-04-17T15:17:53.231-03:00",
//     document: "85.584.717/0001-80",
//     replicate_services: false,
//     replicate_products: false,
//     replicate_payments: false,
//     shop_dc_id: null,
//     active: true,
//     userlimit: 10,
//     module_customer: true,
//     module_admin: true,
//     module_service: true,
//     module_product: true,
//     module_stock: true,
//     module_finance: true,
//     module_fiscal: true,
//     module_cashier: true,
//     module_staff: true,
//     module_agenda: true,
//   },
// ];

export default function Empresas() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colunas] = useState([
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "name" },
    { header: "CNPJ", accessor: "document" },
    { header: "Ativo", accessor: "active" },
  ]);

  const users = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      //console.log("empresas", response.data);
      const adapt = response.data.map((item) => ({
        id: item.id,
        active: item.active,
        name: item.name,
        document: item.document,
        replicate_services: item.replicate_services,
        replicate_products: item.replicate_products,
        replicate_payments: item.replicate_payments,
        shop_dc_id: item.shop_dc_id,
        userlimit: item.userlimit,
        module_customer: item.module_customer,
        module_admin: item.module_admin,
        module_service: item.module_service,
        module_product: item.module_product,
        module_stock: item.module_stock,
        module_finance: item.module_finance,
        module_fiscal: item.module_fiscal,
        module_cashier: item.module_cashier,
        module_staff: item.module_staff,
        module_agenda: item.module_agenda,
        contatoTelOne: item.contatoTelOne,
        contatoTelTwo: item.contatoTelTwo,
        contatoCelOne: item.contatoCelOne,
        contatoCelTwo: item.contatoCelTwo,
        email: "",
        senha: "",
      }));
      setDados(adapt);
      setLoading(false);
    } catch (erro) {
      console.log(erro, "erro ao trazer dados dos das empresas");
    }
  };

  const handleExcluir = (row) => {
    setDados((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, disabled: true } : item
      )
    );
  };

  const handleEditar = (empresas) => {
    navigate(`/edit`, { state: { empresas } });
  };

  const handleView = (empresas) => {
    navigate("/visualizar", { state: { empresas } });
  };

  useEffect(() => {
    users();
    
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="row align-items-center" style={{ height: "50vh" }}>
          <div className="col-12 text-center ">
            <span className="h1">Aguarde...</span>
            <br />
            <Spinner
              animation="border"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
              className="text-center"
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="fw-bold">Empresas</h1>

          <div className="row  align-items-center  mt-3 mb-3 ">
            <div className="col-sm-12 col-md-4  col-lg-2 py-2">
              <button
                className="btn  bg-primary text-light"
                onClick={() => navigate("/adicionarEmpresas")}
              >
                + Adicionar Empresas
              </button>
            </div>
            <div className="col-md-3 col-sm-12 py-1">
              <button
                className="btn  bg-primary text-light"
                onClick={() => navigate("/home")}
              >
                Voltar
              </button>
            </div>
          </div>
            
          <Table
            columns={colunas}
            data={dados}
            onEdit={(item) => handleEditar(item)}
            onDelete={handleExcluir}
            onView={(item) => handleView(item)}
          />
        </div>
      )}
    </div>
  );
}
