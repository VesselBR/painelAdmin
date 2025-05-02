import React, { useState } from "react";
import { createUser } from "../../../services/apiTest";
import { useNavigate } from "react-router-dom";
import { cnpj } from "cpf-cnpj-validator";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdicionarEmpresas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTesteToast = () => {
    toast.success("teste");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cnpj.isValid(formData.document)) {
      toast.error("CNPJ invalido");
      return;
    }

    const novoCliente = {
      id: formData.length + 1,
      name: formData.name,
      document: cnpj.format(formData.document),
      replicate_services: formData.replicate_services,
      replicate_products: formData.replicate_products,
      replicate_payments: formData.replicate_payments,
      userlimit: formData.userlimit,
      module_customer: formData.module_customer,
      module_admin: formData.module_admin,
      module_service: formData.module_service,
      module_product: formData.module_product,
      module_stock: formData.module_stock,
      module_finance: formData.module_finance,
      module_fiscal: formData.module_fiscal,
      module_cashier: formData.module_cashier,
      module_staff: formData.module_staff,
      module_agenda: formData.module_agenda,
      email: formData.email,
      password: formData.password,
    };

    try {
      const addEmpresa = await createUser(novoCliente);
      console.log("Empresa nova");
      toast.success("Empresa cadastrada com sucesso");
      setFormData({
        name: "",
        document: "",
        replicate_services: "",
        replicate_products: "",
        replicate_payments: "",
        shop_dc_id: "",
        userlimit: "",
        module_customer: "",
        module_admin: "",
        module_service: "",
        module_product: "",
        module_stock: "",
        module_finance: "",
        module_fiscal: "",
        module_cashier: "",
        module_staff: "",
        module_agenda: "",
        contatoTelOne: "",
        contatoTelTwo: "",
        contatoCelOne: "",
        contatoCelTwo: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Erro ao cadastrar nova Empresa", error);
    }
    console.log(formData);
  };

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
          {/* <Button onClick={handleTesteToast}>Teste</Button> */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mt-2">
                <Form.Group controlId="name">
                  <Form.Label>Nome da Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mt-2">
                <Form.Group controlId="nomeFantasia">
                  <Form.Label>Nome Fantasia</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomeFantasia"
                    value={formData.nomeFantasia || ""}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>

              {/* <Col md={10}>
                <Form.Group controlId="endereco">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco"
                    value={formData.endereco || "" }
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="numero">
                  <Form.Label>Numero</Form.Label>
                  <Form.Control
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>

              <Col md={3} className="mt-2">
                <Form.Group controlId="cep">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col md={5} className="mt-2">
                <Form.Group controlId="cidade">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col> */}

              <Col md={6} className="mt-2">
                <Form.Group controlId="document">
                  <Form.Label>CNPJ</Form.Label>
                  <Form.Control
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Row className="align-items-end justify-content-center ">
                  <Col md={3} className="mt-2">
                    <h6 className="">Contatos:</h6>
                    <Form.Group controlId="contatoTelOne">
                      <Form.Control
                        type="text"
                        name="contatoTelOne"
                        placeholder="Telefone:1"
                        value={formData.contatoTelOne}
                        onChange={(e) => {
                          handlePhoneChange(e);
                          handleChange(e);
                        }}
                        //required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mt-2">
                    <Form.Group controlId="contatoTelTwo">
                      <Form.Control
                        type="text"
                        name="contatoTelTwo"
                        placeholder="Telefone:2"
                        value={formData.contatoTelTwo}
                        onChange={(e) => {
                          handlePhoneChange(e);
                          handleChange(e);
                        }}
                        //required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mt-2">
                    <Form.Group controlId="contatoCelOne">
                      <Form.Control
                        type="text"
                        name="contatoCelOne"
                        placeholder="Celular:1"
                        value={formData.contatoCelOne}
                        onChange={(e) => {
                          handlePhoneChange(e);
                          handleChange(e);
                        }}
                        //required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mt-2">
                    <Form.Group controlId="contatoCelTwo">
                      <Form.Control
                        type="text"
                        name="contatoCelTwo"
                        placeholder="Celular:2"
                        value={formData.contatoCelTwo}
                        onChange={(e) => {
                          handlePhoneChange(e);
                          handleChange(e);
                        }}
                        //required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-3 mt-4">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Label className="py-3">Unidades:</Form.Label>

                <Col md={6}>
                  <Form.Group controlId="replicate_services" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Replica Serviços"
                      name="replicate_services"
                      checked={formData.replicate_services}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="replicate_products" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Replica Produtos"
                      name="replicate_products"
                      checked={formData.replicate_products}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="replicate_payments" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Replica Pagamentos"
                      name="replicate_payments"
                      checked={formData.replicate_payments}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Col>
              <Col md={6} className="py-4">
                <Form.Group controlId="userlimit">
                  <Form.Label>Quantidade de Usuários:</Form.Label>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      name="userlimit"
                      value={formData.userlimit}
                      onChange={handleChange}
                      //required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col md={12} className="my-3">
                <h6 className="">Modulos:</h6>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_admin" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Admin"
                    name="module_admin"
                    checked={formData.module_admin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_service" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Serviços"
                    name="module_service"
                    checked={formData.module_service}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_product" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Produtos"
                    name="module_product"
                    checked={formData.module_product}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_stock" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Estoque"
                    name="module_stock"
                    checked={formData.module_stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_finance" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Financeiro"
                    name="module_finance"
                    checked={formData.module_finance}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_fiscal" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Fiscal"
                    name="module_fiscal"
                    checked={formData.module_fiscal}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_cashier" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Caixa"
                    name="module_cashier"
                    checked={formData.module_cashier}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_staff" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Profissionais"
                    name="module_staff"
                    checked={formData.module_staff}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="module_agenda" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Agenda"
                    name="module_agenda"
                    checked={formData.module_agenda}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_customer" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Clientes"
                    name="module_customer"
                    checked={formData.module_customer}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <hr />
              <Col md={6}>
                <Form.Group controlId="observacao">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.observacao || ""}
                    onChange={handleChange}
                    placeholder="Digite alguma observação..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Data de Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataCadastro"
                    value={formData.dataCadastro || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="mt-4 me-2 bg-"
              onClick={handleSubmit}
            >
              Gravar
            </Button>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => navigate("/empresas")}
            >
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
