import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function EditarEmpresas() {
  const location = useLocation();
  const navigate = useNavigate();

  const { empresas: empresaSelecionada = {} } = location.state || {};
  const [empresas, setEmpresas] = useState(empresaSelecionada || {});

  //console.log(empresaSelecionada, "testando");

  // const [formData, setFormData] = useState([
  //   {
  //     id: "",
  //     name: "",
  //     document: "",
  //     replicate_services: "",
  //     replicate_products: "",
  //     replicate_payments: "",
  //     shop_dc_id: "",
  //     userlimit: "",
  //     module_customer: "",
  //     module_admin: "",
  //     module_service: "",
  //     module_product: "",
  //     module_stock: "",
  //     module_finance: "",
  //     module_fiscal: "",
  //     module_cashier: "",
  //     module_staff: "",
  //     module_agenda: "",
  //     contatoTelOne: "",
  //     contatoTelTwo: "",
  //     contatoCelOne: "",
  //     contatoCelTwo: "",
  //     email: "",
  //     senha: "",

  //   },
  // ]);

  //Formata para telefone e celular
  const handlePhoneChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    const name = event.target.name;

    if (name === "contatoCelOne" || name === "contatoCelTwo") {
      if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 9)
        value = `${value.slice(0, 10)}-${value.slice(10, 14)}`;
    } else if (name === "contatoTelOne" || name === "contatoTelTwo") {
      if (value.length > 2)
        // Formatação automática (XX) XXXXX-XXXX
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 8)
        value = `${value.slice(0, 9)}-${value.slice(9, 13)}`;
    }

    event.target.value = value;
    setEmpresas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Muda qualquer alteração
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpresas((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
      const { id, created_at, updated_at, ...restDados } = empresas;

      const dadosParaEnviar = {
        id,
        ...restDados
      }

       console.log("Enviando dados:", dadosParaEnviar)

      const response = await axios.put(
        `https://sistema-salao-proud-shape-889.fly.dev/api/tenants/${id}`,
        dadosParaEnviar
      );
      console.log("Empresa atualizada com sucesso!", response.data);
      toast.success("Dados atualizados com sucesso!");
      navigate("/empresas");
    } catch (erro) {
      console.log("Erro ao atualizar dados: ", erro);
      toast.error("Erro ao atualizar dados")
    }
  };

  // const handleSalvarEdicao = (e) => {
  //   e.preventDefault();
  //   setDados((prev) =>
  //     prev.map((item) =>
  //       item.id === clienteEditando.id ? clienteEditando : item
  //     )
  //   );
  //   setClienteEditando(null); // Limpa o formulário após salvar
  // };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h1>Editar Empresas</h1>
          <Button onClick={() => navigate("/empresas")} className="mb-3">
            Voltar
          </Button>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mt-2">
                <Form.Group controlId="name">
                  <Form.Label>Nome da Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={empresas.name || ""}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mt-2">
                <Form.Group controlId="nomeFantasia">
                  <Form.Label>Nome Fantasia</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomeFantasia"
                    value={empresas.nomeFantasia || ""}
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
                    value={empresas.endereco || "" }
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
                    value={empresas.numero}
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
                    value={empresas.cep}
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
                    value={empresas.cidade}
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
                    value={empresas.document}
                    onChange={handleChange}
                    //required
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
                        value={empresas.contatoTelOne}
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
                        value={empresas.contatoTelTwo}
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
                        value={empresas.contatoCelOne}
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
                        value={empresas.contatoCelTwo}
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
                    value={empresas.email}
                    onChange={handleChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="passoword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="passoword"
                    value={empresas.passoword}
                    onChange={handleChange}
                    //required
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
                      checked={empresas.replicate_services}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="replicate_products" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Replica Produtos"
                      name="replicate_products"
                      checked={empresas.replicate_products}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="replicate_payments" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Replica Pagamentos"
                      name="replicate_payments"
                      checked={empresas.replicate_payments}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Col>
              <Col md={6} className="py-4">
                <Form.Group controlId="userLimit">
                  <Form.Label>Quantidade de Usuários:</Form.Label>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      name="userLimit"
                      value={empresas.userlimit}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col md={12} className="my-4">
                <h6 className="">Modulos:</h6>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_admin" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Admin"
                    name="module_admin"
                    checked={empresas.module_admin}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_service" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Serviços"
                    name="module_service"
                    checked={empresas.module_service}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_product" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Produtos"
                    name="module_product"
                    checked={empresas.module_product}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_stock" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Estoque"
                    name="module_stock"
                    checked={empresas.module_stock}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_finance" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Financeiro"
                    name="module_finance"
                    checked={empresas.module_finance}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_fiscal" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Fiscal"
                    name="module_fiscal"
                    checked={empresas.module_fiscal}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_cashier" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Caixa"
                    name="module_cashier"
                    checked={empresas.module_cashier}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_staff" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Profissionais"
                    name="module_staff"
                    checked={empresas.module_staff}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="module_agenda" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Agenda"
                    name="module_agenda"
                    checked={empresas.module_agenda}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="module_customer" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Módulo Clientes"
                    name="module_customer"
                    checked={empresas.module_customer}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <hr />
              <Col md={6} className="mt-3">
                <Form.Group controlId="observacao">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="observacao"
                    rows={4}
                    value={empresas.observacao || ""}
                    onChange={handleChange}
                    placeholder="Digite alguma observação..."
                    maxLength={200}
                  />
                  <Form.Text muted>
                    {empresas.observacao?.length || 0}/200 caracteres
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6} className="mt-3">
                <Form.Group>
                  <Form.Label>Data de Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataCadastro"
                    value={empresas.dataCadastro || ""}
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
