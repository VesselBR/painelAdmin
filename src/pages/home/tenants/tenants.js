import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/apiTenants";
import { Spinner } from "react-bootstrap";
import Table from "../../../components/Table/table";

export default function Tenants() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colunas] = useState([
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "name" },
    { header: "CNPJ", accessor: "document" },
    
  ]);

  const users = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      console.log("empresas", response.data);
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
                onClick={() => navigate("/addTenants")}
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
