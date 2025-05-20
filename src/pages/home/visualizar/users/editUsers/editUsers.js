// src/pages/EditUnits.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUsuarios } from "../../../../../services/apiTenants";

// Componente de input reutilizável
function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} onChange={onChange} />
    </Form.Group>
  );
}

// Componente select reutilizável
function SelectField({ label, name, value, options, onChange }) {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const { usuarios = {} } = location.state || {};
  console.log(usuarios , "123")

  const [users, setUsers] = useState({
    ...usuarios,
    admin: usuarios.admin ? "true" : "false",  
  });

  const handleChange = ({ target: { name, value } }) => {
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tenantId = usuarios.tenant_id;

      // Conversão correta do admin para boolean
      const userToSend = {
        ...users,
        admin: users.admin === "true",
      };
      //console.log('id:', tenantId,'usuario:', userToSend)

      await updateUsuarios(tenantId, userToSend);
      toast.success("Dados atualizados com sucesso!");
      //navigate("/empresas");
    } catch (erro) {
      console.error("Erro ao atualizar dados: ", erro);
      toast.error("Erro ao atualizar dados");
    }
  };

  return (
    <Container>
      <Card className="my-3 shadow-md">
        <Card.Body>
          <h2>Editar Usuário</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <InputField
                  label="Nome"
                  name="first_name"
                  value={users.first_name || ""}
                  onChange={handleChange}
                />
              </Col>
              
                
                  <Col md={6}>
                    <InputField
                      label="Email"
                      name="email"
                      value={users.email || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <InputField
                      label="Senha"
                      name="password"
                      type="password"
                      value={users.password || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <InputField
                      label="Confirmar Senha"
                      name="password_confirm"
                      type="password"
                      value={users.password_confirm || ""}
                      onChange={handleChange}
                    />
                  </Col>
                
              <Col md={2}>
                <Row>
                  <Col md={8}>
                    <InputField
                      label="PIN"
                      name="pin"
                      type="number"
                      value={users.pin || ""}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>              

              {/* SELECT para perfil de usuário */}
              <Col md={4}>
                <SelectField
                  label="Perfil"
                  name="admin"
                  value={users.admin}
                  onChange={handleChange}
                  options={[
                    { value: "true", label: "Administrador" },
                    { value: "false", label: "Usuário" },
                  ]}
                />
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
