//https://sistema-salao-proud-shape-889.fly.dev/api/tenants/7/users

import React, { useEffect } from "react";
import { useState } from "react";

import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "../../../../components/Table/table";

import { getUsuarios, createUsuarios } from "../../../../services/apiTenants";

const initialState = {
  active: "",
  email: "",
  first_name: "",
  //id: "",
  pin: "",
  role_id: "",
  tenant_id: "",
};

export default function Users() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarios = {} } = location.state || {};
  const { empresas = {} } = location.state || {};
  const [viewUsuarios, setViewUsuarios] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [stateAdmin, setStateAdmin] = useState("");

  const [colunas, setColunas] = useState(
    empresas?.id
      ? [
          { header: "Acesso", accessor: "role_id" },
          { header: "Nome", accessor: "first_name" },
          { header: "Email", accessor: "email" },
        ]
      : []
  );

  const [dados, setDados] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    users();
  }, []);

  //pega os usuarios
  const users = async () => {
    const tenantId = empresas.id;
    try {
      const response = await getUsuarios(tenantId);
      const usuarios = response.data;
      setDados(usuarios);
      console.log(usuarios, "achando usuarios");
    } catch (erro) {
      console.log("erro ao achar usuarios", erro);
    }
  };

  useEffect(() => {
    console.log(dados, "form atualizado");
  }, [dados]);

  const handleExcluir = (row) => {
    setDados((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // const isAdmin = value === "admin"

    // // Atualiza o campo nivel com valor boolean
    // setForm((prev) => ({...prev , [name]: isAdmin}))

    // setAdmin(isAdmin);

    // console.log("setAdmin :", admin, "setForm :", form )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.first_name) newErrors.name = "Preencha campo Nome";
    if (!form.email) newErrors.email = "Preencha campo Email";
    if (!form.password) newErrors.password = "Preencha campo Senha";
    if (!form.confirm_assword) newErrors.confirm_password = "";
    if (!form.pin) newErrors.pin = "Preencha campo PIN";
    if (!form.acesso) newErrors.acesso = "Preencha campo Acesso";
    if (!form.nivel) newErrors.nivel = "Preencha campo Nivel";

    setErrors(newErrors);

   
    const tenantId = empresas.id;
    //return Object.keys(newErrors).length === 0;
    const newItem = {
     ...form,
     tenant_id: empresas.id
    };
    setDados((prev) => [...prev, newItem]);

    try {
      const newUsuarios = await createUsuarios(tenantId, newItem);
      console.log("novo usuario", newUsuarios);
    } catch (erro) {
      console.log("");
    }
    setForm(initialState);

    setViewUsuarios(false);
    console.log(dados, "dados att", form, "att form");
  };

  const handleEditar = ( usuarios ) => {
   
    navigate("/editUsers", { state: { usuarios } });
  };

  const handleView = (usuarios) => {
    navigate("/viewUsers", { state: { usuarios } });
  };

  return (
    <Container>
      <h1>Usuarios</h1>
      <h2>Empresa:{empresas.name}</h2>
      <Col md={6}>
        <Row className="justify-content-start ">
          <Button
            className="col-auto m-2"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
          <Button
            className="col-auto m-2"
            onClick={() => setViewUsuarios(true)}
          >
            Cadastrar Usuarios
          </Button>
        </Row>
      </Col>

      <Table
        columns={colunas}
        data={dados}
        onEdit={(item) => handleEditar(item)}
        desable
        onDelete={handleExcluir}
        onView={(item) => handleView(item)}
      />

      {viewUsuarios ? (
        <Card className="my-3">
          <Card.Body>
            <h2>Usuarios</h2>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group controlId="first_name">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="passwordConfirm">
                  <Form.Label>Confirmar Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={form.passwordConfirm}
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pin">
                  <Form.Label>Informe seu PIN:</Form.Label>
                  <Form.Control
                    type="text"
                    name="pin"
                    value={form.pin}
                    onChange={handleChange}
                    isInvalid={!!errors.pin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pin}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="nivel">
                  <Form.Label>Nível de Acesso:</Form.Label>
                  <Form.Select
                    type="dropdown"
                    name="nivel"
                    value={
                      form.nivel === true
                        ? "admin"
                        : form.nivel === false
                          ? "usuario"
                          : ""
                    }
                    onChange={handleChange}
                    isInvalid={!!errors.nivel}
                  >
                    <option value="">Selecione...</option>
                    <option value="admin">Administrador</option>

                    <option value="usuario">Usuário</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.nivel}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="mt-4 me-2 bg-"
              onClick={handleSubmit}
            >
              Salvar
            </Button>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => setViewUsuarios(false)}
            >
              Cancelar
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </Container>
  );
}
