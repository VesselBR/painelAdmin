import React from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { Container, Button , Card, Row,Col} from "react-bootstrap";

export default function ViewUnits () {
    const navigate = useNavigate();
    const location = useLocation();

    const {unidades = {}} = location.state

    return (
      <Container>
        <h1>Unidade:{unidades.name}</h1>
        <Button
          variant="primary"
          onClick={() => navigate("/empresas")}
          className="my-3"
        >
          Voltar
        </Button>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Dados do Usuario</Card.Title>
            <hr />
            <Row>
              <Col md={4} className="my-3">
                <strong>Nome:</strong>
                {unidades?.name || ""}
              </Col>
              <Col md={4} className="my-3">
                <strong>Endereço:</strong> {unidades?.address_name || " "}
                <strong className="ms-2">N°:</strong>{" "}
                {unidades?.address_nunmber}
              </Col>

              <Col md={4} className="my-3">
                <strong>CEP:</strong> {unidades?.zip_code || " XXXXX-XXX"}
              </Col>
              <Col md={4} className="my-3">
                <strong>Bairro</strong> {unidades?.neighborhood || ""}
              </Col>
              <Col md={4} className="my-3">
                <strong>Cidade:</strong> {unidades?.city || ""}
              </Col>
              <Col md={4} className="my-3">
                <strong>Estado:</strong> {unidades?.state || ""}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
}