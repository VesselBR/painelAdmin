import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function Visualizar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { empresas = {} } = location.state || {};

  useEffect(() => {
    console.log(empresas, "verificando empresas");
  });
  return (
    <Container className="mt-4">
      <div>
        <h1 className="">Empresa:{empresas.name}</h1>
        <Row>
          <Col>
            <Button
              className="me-2 my-3"
              onClick={() => navigate("/units", { state: { empresas } })}
            >
              Unidades
            </Button>
            <Button
              className="mx-2 my-3"
              onClick={() =>
                navigate("/niveisDeAcesso", { state: { empresas } })
              }
            >
              Niveis de Acesso
            </Button>
            <Button
              className="mx-2 my-3"
              onClick={() => navigate("/users", { state: { empresas } })}
            >
              Usuarios
            </Button>
          </Col>
        </Row>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Dados da Empresa</Card.Title>
            <Row>
              <Col md={6}>
                <strong>Nome da Empresa:</strong> {empresas?.name || ""}
              </Col>
              <Col md={6}>
                <strong>Nome Fantasia:</strong> {empresas.name}
              </Col>
              {/* <Col md={6}>
                <Row>
                  <Col md={5}>
                    <strong>Endereço:</strong> {empresas?.end || "Rua: Brasil"}
                  </Col>
                  <Col md={2}>
                    <strong>N°:</strong> {empresas?.number || "XX"}
                  </Col>
                  <Col md={5}>
                    <strong>Cidade:</strong> {empresas?.city || "São Paulo"}
                  </Col>
                  <Col md={4}>
                    <strong>CEP:</strong> {empresas?.cep || "xxxx-xxx"}
                  </Col>
                </Row>
              </Col> */}
              <Col md={6}>
                <strong>CNPJ:</strong> {empresas.document}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Contatos</Card.Title>
            <Row>
              <Col md={3}>
                <strong>Contato 1:</strong>{" "}
                {empresas?.contatoTelOne || "(XX) XXXX-XXXX"}
              </Col>
              <Col md={3}>
                <strong>Contato 2:</strong>{" "}
                {empresas?.contatoTelTwo || "(XX) XXXX-XXXX"}
              </Col>
              <Col md={3}>
                <strong>Celular 1:</strong>{" "}
                {empresas?.contatoCelOne || "(XX) X-XXXX-XXXX"}
              </Col>
              <Col md={3}>
                <strong>Celular 2:</strong>{" "}
                {empresas?.contatoCelTwo || "(XX) X-XXXX-XXXX"}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Row className="align-items-center">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantidade de Usuários</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    value={empresas?.userlimit || "XX"}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    value={empresas?.email || ""}
                  />
                </Form.Group>
              </Col>
              <Col className="mb-4" md={4}>
                <Card.Title>Configurações</Card.Title>
                <Form.Check
                  label="Replica Serviços"
                  checked={empresas.replicate_service}
                  disabled
                />
                <Form.Check
                  label="Replica Produtos"
                  checked={empresas.replicate_products}
                  disabled
                />
                <Form.Check
                  label="Replica Pagamentos"
                  checked={empresas.replicate_payments}
                  disabled
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row>
              <Card.Title>Configurações Módulos:</Card.Title>
              <Col md={4}>
                <Form.Check
                  label="Módulo Admin"
                  checked={empresas.module_admin}
                  disabled
                />
                <Form.Check
                  label="Módulo Produtos"
                  checked={empresas.module_product}
                  disabled
                />
                <Form.Check
                  label="Módulo Estoque"
                  checked={empresas.module_stock}
                  disabled
                />
              </Col>
              <Col md={4}>
                <Form.Check
                  label="Módulo Financeiro"
                  checked={empresas.module_finance}
                  disabled
                />
                <Form.Check
                  label="Módulo Fiscal"
                  checked={empresas.module_fiscal}
                  disabled
                />
                <Form.Check
                  label="Módulo Caixa"
                  checked={empresas.module_cashie}
                  disabled
                />
              </Col>
              <Col md={4}>
                <Form.Check
                  label="Módulo Profissionais"
                  checked={empresas.module_staff}
                  disabled
                />
                <Form.Check
                  label="Módulo Agenda"
                  checked={empresas.module_agenda}
                  disabled
                />
                <Form.Check
                  label="Módulo Clientes"
                  checked={empresas.module_customer}
                  disabled
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="shadow-sm">
          <Card.Body>
            <Row>
              <Col md={6}>
                <strong>Observações:</strong>{" "}
                {empresas?.obs || "Campo de Obervações"}
              </Col>
              <Col md={6}>
                <strong>Data de Inicio:</strong>{" "}
                {empresas?.date || "DD/MM/AAAA"}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Button
        variant="secondary"
        onClick={() => navigate("/empresas")}
        className="my-3"
      >
        Voltar
      </Button>
    </Container>
  );
}
