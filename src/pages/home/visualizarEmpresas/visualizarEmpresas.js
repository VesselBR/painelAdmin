import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VisualizarEmpresas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { empresas = {} } = location.state || {};
  return (
    <Container className="mt-4">
      <h1 className="mb-4">{empresas.name}</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Dados da Empresa</Card.Title>
          <Row>
            <Col md={6}>
              <strong>Nome da Empresa:</strong> {empresas.name}
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
                  value={empresas?.quantidadeUsuarios || "XX"}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  value={empresas?.email || "exemplo@ex.com"}
                />
              </Form.Group>
            </Col>

            <Col className="mb-4" md={4}>
              <Card.Title>Configurações</Card.Title>
              <Form.Check
                label="Replica Serviços"
                checked={empresas.replicaServicos}
                disabled
              />
              <Form.Check
                label="Replica Produtos"
                checked={empresas.replicaProdutos}
                disabled
              />
              <Form.Check
                label="Replica Pagamentos"
                checked={empresas.replicaPagamentos}
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
            <Col md={3}>
              <Form.Check
                label="Módulo Admin"
                checked={empresas.replicaServicos}
                disabled
              />
              <Form.Check
                label="Módulo Produtos"
                checked={empresas.replicaProdutos}
                disabled
              />
              <Form.Check
                label="Módulo Estoque"
                checked={empresas.replicaPagamentos}
                disabled
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="Módulo Financeiro"
                checked={empresas.replicaServicos}
                disabled
              />
              <Form.Check
                label="Módulo Fiscal"
                checked={empresas.replicaProdutos}
                disabled
              />
              <Form.Check
                label="Módulo Caixa"
                checked={empresas.replicaPagamentos}
                disabled
              />
            </Col>

            <Col md={3}>
              <Form.Check
                label="Módulo Profissionais"
                checked={empresas.replicaServicos}
                disabled
              />
              <Form.Check
                label="Módulo Agenda"
                checked={empresas.replicaProdutos}
                disabled
              />
              <Form.Check
                label="Módulo Clientes"
                checked={empresas.replicaPagamentos}
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
              <strong>Data de Inicio:</strong> {empresas?.date || "DD/MM/AAAA"}
            </Col>
          </Row>
        </Card.Body>
      </Card>

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
