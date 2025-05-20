import React, { useState } from "react";
import { createUser } from "../../../services/apiTenants";
import { useNavigate } from "react-router-dom";
import { cnpj } from "cpf-cnpj-validator";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const initialState = {
  id: "",
  name: "",
  document: "",
  replicate_services: false,
  replicate_products: false,
  replicate_payments: false,
  shop_dc_id: "",
  userlimit: "",
  module_customer: false,
  module_admin: false,
  module_service: false,
  module_product: false,
  module_stock: false,
  module_finance: false,
  module_fiscal: false,
  module_cashier: false,
  module_staff: false,
  module_agenda: "",
  contatoTelOne: "",
  contatoTelTwo: "",
  contatoCelOne: "",
  contatoCelTwo: "",
  email: "",
  password: "",
  nomeFantasia: "",
};

export default function AdicionarEmpresas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Preencha campo Nome";
    if (!formData.document) newErrors.document = "Preencha campo CNPJ";
    if (!formData.userlimit) newErrors.userlimit = "Preencha campo Quantidade de Usuários";
    if (!formData.email) newErrors.email = "Preencha campo Email";
    if (!formData.password) newErrors.password = "Preencha campo Senha";

    return newErrors;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cnpj.isValid(formData.document)) {
      toast.error("CNPJ invalido");
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    const novoCliente = {
      ...formData,
      document: cnpj.format(formData.document),
      //id: Date.now(),
    };

    try {
      await createUser(novoCliente);
      console.log("Empresa nova", novoCliente);
      toast.success("Empresa cadastrada com sucesso");
      setFormData(initialState);
    } catch (error) {
      console.log("Erro ao cadastrar nova Empresa", error);
    }
    console.log(formData);
  };

  const renderInput = (label, name, type = "text", required = false) => (
    <Form.Group controlId={name} className="mt-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={type === "textarea" ? "textarea" : "input"}
        type={type !== "textarea" ? type:undefined}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        isInvalid={!!errors[name]}
        required={required}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  const renderCheckbox = (label, name) => (
    <Form.Check
      type="checkbox"
      label={label}
      name={name}
      checked={formData[name]}
      onChange={handleChange}
      className="mb-2"
    />
  );

  const handlePhoneChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    const name = event.target.name;

    if (name === "contatoCelOne" || name === "contatoCelTwo") {
      if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 9)
        value = `${value.slice(0, 10)}-${value.slice(10, 14)}`;
    } else if (name === "contatoTelOne" || name === "contatoTelTwo") {
      if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 8)
        value = `${value.slice(0, 9)}-${value.slice(9, 13)}`;
    }

    event.target.value = value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h1>Adicionar Empresas</h1>
          <Button onClick={() => navigate("/empresas")} className="mb-3">
            Voltar
          </Button>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                {renderInput("Nome da Empresa", "name", "text", true)}
              </Col>
              <Col md={6}>{renderInput("Nome Fantasia", "nomeFantasia")}</Col>
              <Col md={6}>{renderInput("CNPJ", "document", "text", true)}</Col>
            </Row>

            <Row className="mt-3">
              {[
                "contatoTelOne",
                "contatoTelTwo",
                "contatoCelOne",
                "contatoCelTwo",
              ].map((field, i) => (
                <Col md={2} key={i}>
                  <Form.Control
                    type="text"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={(e) => {
                      handlePhoneChange(e);
                      handleChange(e);
                    }}
                  />
                </Col>
              ))}
            </Row>

            <Row className="mt-3">
              <Col md={6}>{renderInput("Email", "email", "email", true)}</Col>
              <Col md={6}>
                {renderInput("Senha", "password", "password", true)}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={6}>
                <Form.Label>Unidades:</Form.Label>
                {renderCheckbox("Replica Serviços", "replicate_services")}
                {renderCheckbox("Replica Produtos", "replicate_products")}
                {renderCheckbox("Replica Pagamentos", "replicate_payments")}
              </Col>
              <Col md={6}>
                {renderInput(
                  "Quantidade de Usuários",
                  "userlimit",
                  "number",
                  true
                )}
              </Col>
            </Row>

                <hr/>
            <Row className="mt-4 ">
              <Form.Label>Módulos:</Form.Label>
              <Col md={12}>
                <Row>
                  <Col>
                    {renderCheckbox("Módulo Admin", "module_admin")}
                    {renderCheckbox("Módulo Serviços", "module_service")}
                    {renderCheckbox("Módulo Produtos", "module_product")}
                  </Col>
                  <Col>
                    {renderCheckbox("Módulo Estoque", "module_stock")}
                    {renderCheckbox("Módulo Financeiro", "module_finance")}
                    {renderCheckbox("Módulo Fiscal", "module_fiscal")}
                  </Col>
                  <Col>
                    {renderCheckbox("Módulo Caixa", "module_cashier")}
                    {renderCheckbox("Módulo Profissionais", "module_staff")}
                    {renderCheckbox("Módulo Agenda", "module_agenda")}
                  </Col>
                  <Col>
                    {renderCheckbox("Módulo Clientes", "module_customer")}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Label>Observações:</Form.Label>
                {renderInput("", "observacao", "textarea")}
              </Col>
              <Col md={6}>
                <Form.Label>Data:</Form.Label>
                {renderInput("data", "dataCadastro", "date")}
              </Col>
            </Row>

            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

