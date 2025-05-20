// src/pages/EditUnits.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updateShops } from "../../../../../services/apiTenants";

// Componente de input reutilizável
function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} onChange={onChange} />
    </Form.Group>
  );
}
 
export default function EditUnits() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unidades = {} } = location.state || {};
  const { empresas = {} } = location.state || {};
   
  const [units, setUnits] = useState(unidades);

 
  const handleChange = ({ target: { name, value, type, checked } }) => {
    setUnits((prev) => ({
      ...prev,
     
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tenantId = empresas.id;
      await updateShops(tenantId, units);
      toast.success("Dados atualizados com sucesso!");
      //navigate("/empresas");
    } catch (erro) {
      console.error("Erro ao atualizar dados: ", erro);
      toast.error("Erro ao atualizar dados");
    }
  };

  return (
    <Container>
      <Card className="my-3">
        <Card.Body>
          <h2>Nova Unidade</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <InputField
                  label="Nome"
                  name="name"
                  value={units.name || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={10}>
                    <InputField
                      label="Endereço"
                      name="address_name"
                      value={units.address_name || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <InputField
                      label="Número"
                      name="address_number"
                      type="number"
                      value={units.address_number || ""}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={4}>
                    <InputField
                      label="CEP"
                      name="zip_code"
                      value={units.zip_code || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={8}>
                    <InputField
                      label="Bairro"
                      name="neighborhood"
                      value={units.neighborhood || ""}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={10}>
                    <InputField
                      label="Cidade"
                      name="city"
                      value={units.city || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <InputField
                      label="Estado"
                      name="state"
                      value={units.state || ""}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-4 me-2">
              Salvar
            </Button>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
