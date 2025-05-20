import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col } from "react-bootstrap";

export default function ViewUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuarios = {} } = location.state;

  return (
    <Container>
      <h1>Usuarios:{usuarios.name}</h1>
      <Button
        variant="primary"
        onClick={() => navigate(-1)}
        className="my-3"
      >
        Voltar
      </Button>
      <Card className="mb-4 shadow-lg">
        <Card.Body>
          <Card.Title>Dados do Usuario</Card.Title>
          <hr />
          <Row>
            <Col md={6} className="my-3">
              <strong>Nome:</strong>
              {usuarios?.first_name || ""}
            </Col>
            <Col md={6} className="my-3">
              <strong>Email:</strong> {usuarios?.email || " "}
            </Col>

            <Col md={6} className="my-3">
              <strong>Senha:</strong> {usuarios?.password || ""}
            </Col>
            <Col md={6} className="my-3">
              <strong>Confirmar Senha:</strong>{" "}
              {usuarios?.confirm_password || ""}
            </Col>
            <Col md={6} className="my-3">
              <strong>PIN:</strong> {usuarios?.pin || ""}
            </Col>
            <Col md={6} className="my-3">
              <strong>Nivel de Acesso:</strong> {usuarios?.admin || ""}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
