//https://sistema-salao-proud-shape-889.fly.dev/api/tenants/7/roles
import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "../../../../components/Table/table";
import { getRoles, createRoles } from "../../../../services/apiTenants";
import { toast } from "react-toastify";
import { formNiveisInitialState } from "../../../../components/Forms/Forms";

const acoes = ["View", "Create", "Edit", "Delete"]; // pega o meio dos nomes dos campos

const labels = {
  View: "Exibir",
  Create: "Criar",
  Edit: "Editar",
  Delete: "Deletar",
};

const access = {
  Gestão: [
    { label: "Unidades", prefix: "Shop" },
    { label: "Níveis de Acesso", prefix: "Role" },
    { label: "Usuários", prefix: "User" },
  ],
  Serviços: [
    { label: "Serviços", prefix: "Service" },
    { label: "Pacotes", prefix: "Package" },
  ],
  Produtos: [{ label: "Produtos", prefix: "Product" }],
  Estoque: [
    { label: "Inventário", prefix: "Inventory" },
    { label: "Entradas por Fornecedor", prefix: "Entry" },
    { label: "Saída por Profissional", prefix: "Request" },
  ],
  Financeiro: [
    { label: "Caixa", prefix: "Cashier" },
    { label: "Tipos de Pagamentos", prefix: "Financial" },
  ],
  Comanda: [{ label: "Comanda", prefix: "Comanda" }],
  Profissionais: [{ label: "Profissionais", prefix: "Staff" }],
  Agenda: [{ label: "Agenda", prefix: "Booking" }],
  Clientes: [
    { label: "Clientes", prefix: "Customer" },
    { label: "Campanha", prefix: "Campaign" },
  ],
};

export default function NiveisDeAcesso() {
  const navigate = useNavigate();
  const location = useLocation();
  const { empresas = {} } = location.state || {};

  const [acessos, setAcessos] = useState(false);
  const [colunas] = useState(
    empresas?.id
      ? [
          { header: "ID", accessor: "id" },
          { header: "Nome", accessor: "name" },
          { header: "Cidade", accessor: "" },
        ]
      : []
  );
  const [activeKeyOne, setActiveKeyOne] = useState(true);
  const [activeKeyTwo, setActiveKeyTwo] = useState(true);

  // nenhum aberto inicialmente
  const toggleAccordion = (eventKey, group) => {
    switch (group) {
      case "one":
        setActiveKeyOne(activeKeyOne === eventKey ? null : eventKey);
        break;
      case "two":
        setActiveKeyTwo(activeKeyTwo === eventKey ? null : eventKey);
        break;
      default:
        break;
    }
  };

  const [dados, setDados] = useState([]);

  const [form, setForm] = useState(formNiveisInitialState);

  const roles = useCallback(async () => {
    const tenantsId = empresas.id;
    try {
      const response = await getRoles(tenantsId);
      const item = response.data;
      setDados(item);
      console.log("achando roles", item);
    } catch (erro) {
      console.log("erro ao carregar níveis de acesso", erro);
    }
  }, [empresas]);

  useEffect(() => {
    if (empresas?.id) {
      roles();
    }
  }, [empresas, roles]);

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  const handleExcluir = (row) => {
    setDados((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleEditar = (niveis) => {
    navigate(`/editNiveis`, { state: { niveis } });
  };

  const handleView = (niveis) => {
    navigate("/viewNiveis", { state: { niveis } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNiveis = {
      ...form,
    };

    // setErrors(newErrors);

    try {
      await createRoles(newNiveis);
      console.log("Empresa nova");
      toast.success("Empresa cadastrada com sucesso");
      setForm(formNiveisInitialState);
    } catch (error) {
      console.log("Erro ao cadastrar nova Empresa", error);
    }
    console.log(form);
  };

  return (
    <Container>
      <h1>Niveis de Acesso : {empresas.name}</h1>
      <Col md={6}>
        <Row className="justify-content-start ">
          <Button className="col-auto m-2" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button className="col-auto m-2" onClick={() => setAcessos(true)}>
            Cadastrar Nível de Acesso
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

      {acessos ? (
        <div>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <h2>Nome</h2>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name || ""}
                    //onChange={handleChange}
                    //required={required}
                  />
                </Form.Group>
                <nav>
                  <div class="nav nav-tabs mt-5" id="nav-tab" role="tablist">
                    <button
                      class="nav-link active"
                      id="nav-acess-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-acess"
                      type="button"
                      role="tab"
                      aria-controls="nav-acess"
                      aria-selected="true"
                    >
                      Acessos
                    </button>
                    <button
                      class="nav-link"
                      id="nav-permissoes-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-permissoes"
                      type="button"
                      role="tab"
                      aria-controls="nav-permissoes"
                      aria-selected="false"
                    >
                      Permissões
                    </button>
                  </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-acess"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabindex="0"
                  >
                    <Row>
                      {Object.entries(access).map(
                        ([grupo, permissoes], index) => (
                          <Accordion
                            key={grupo}
                            defaultActiveKey="0"
                            className="my-1 "
                          >
                            <Accordion.Item eventKey={`${index}`} className="">
                              <Accordion.Header className="">
                                <p className="h5 fw-bold  ">{grupo}</p>
                              </Accordion.Header>
                              <Accordion.Body>
                                {permissoes.map(({ label, prefix }) => (
                                  <Col key={prefix} md={12}>
                                    <hr />
                                    <Row className="justify-content-between">
                                      <Col>
                                        <strong className=" fw-bold">
                                          {label}
                                        </strong>
                                      </Col>
                                      {acoes.map((acao) => {
                                        const key = `can${acao}${prefix}`;
                                        if (form[key] === undefined)
                                          return null;
                                        return (
                                          <Form.Switch
                                            key={key}
                                            inline
                                            label={labels[acao]}
                                            name={key}
                                            checked={form[key] || false}
                                            onChange={handleToggle}
                                            className="me-2 col-md-1"
                                          />
                                        );
                                      })}
                                    </Row>
                                  </Col>
                                ))}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        )
                      )}
                    </Row>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-permissoes"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabindex="0"
                  >
                    <Row>
                      <Col md={6} className="my-2 ">
                        <Accordion
                          activeKey={activeKeyOne}
                          onSelect={(key) => toggleAccordion(key, "one")}
                        >
                          <Accordion.Item>
                            <Accordion.Header className="h5 fw-bold">
                              Auditoria
                            </Accordion.Header>
                            <Accordion.Body style={{ height: "100%" }}>
                              <Row className="justify-content-between">
                                <Col>
                                  <strong className="me-3">Visualizar**</strong>
                                </Col>
                                <Col className="text-end">
                                  <Form.Switch
                                    inline
                                    label=""
                                    checked={form.canViewAudit || false}
                                    onChange={handleToggle}
                                  />
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                      <Col md={6} className="my-2">
                        <Accordion
                          activeKey={activeKeyOne}
                          onSelect={(key) => toggleAccordion(key, "one")}
                        >
                          <Accordion.Item>
                            <Accordion.Header>Caixa</Accordion.Header>
                            <Row>
                              <Col>
                                <Accordion.Body>
                                  <Row className="justify-content-between">
                                    <Col>
                                      <strong className="me-3">
                                        Abertura de caixa**
                                      </strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        checked={form.canDeleteRole || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>Fechamento de Caixa**</strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        checked={form.canDeleteRole || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>Estorno de Caixa</strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canReverseCashier"
                                        checked={
                                          form.canReverseCashier || false
                                        }
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                            </Row>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                      <Col md={6} className="my-2">
                        <Accordion
                          activeKey={activeKeyTwo}
                          onSelect={(key) => toggleAccordion(key, "two")}
                        >
                          <Accordion.Item>
                            <Accordion.Header>Comanda</Accordion.Header>
                            <Row>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>Cancelamento de Comanado</strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canCancelComanda"
                                        checked={form.canCancelComanda || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>Estorno de Comanado</strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canReverseComanda"
                                        checked={
                                          form.canReverseComanda || false
                                        }
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col md={6}>
                                      <strong>Desconto em Serviços</strong>
                                    </Col>
                                    <Col md={6} className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canDiscountProductComanda"
                                        checked={
                                          form.canDiscountProductComanda ||
                                          false
                                        }
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                  <Form>
                                    <Form.Group>
                                      <Row>
                                        <Col md={6}>
                                          <Form.Label>
                                            <strong className="">
                                              Limite de Desconto em Produtos (%)
                                            </strong>
                                          </Form.Label>
                                        </Col>
                                        <Form.Control
                                          type="text"
                                          name="productComandaDiscoutLimit"
                                          checked={
                                            form.productComandaDiscoutLimit ||
                                            false
                                          }
                                          onChange={handleToggle}
                                        />
                                      </Row>
                                    </Form.Group>
                                  </Form>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Form>
                                    <Form.Group>
                                      <Row>
                                        <Col>
                                          <strong>
                                            Desconto em Serviços (%)
                                          </strong>
                                        </Col>
                                        <Col className="text-end">
                                          <Form.Switch
                                            inline
                                            label=" "
                                            name="canDiscountServiceComanda"
                                            checked={
                                              form.canDiscountServiceComanda ||
                                              false
                                            }
                                            onChange={handleToggle}
                                          />
                                        </Col>
                                      </Row>
                                      <Form.Label>
                                        <strong className="">
                                          {" "}
                                          Limite de Desconto em Serviço(%)
                                        </strong>
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="serviceComandaDiscoutLimit"
                                        checked={
                                          form.serviceComandaDiscoutLimit ||
                                          false
                                        }
                                        onChange={handleToggle}
                                      />
                                    </Form.Group>
                                  </Form>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>
                                        Editar preço do serviço **
                                      </strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        checked={form.canDeleteRole || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                            </Row>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                      <Col md={6} className="my-2">
                        <Accordion
                          activeKey={activeKeyTwo}
                          onSelect={(key) => toggleAccordion(key, "two")}
                        >
                          <Accordion.Item>
                            <Accordion.Header>Agenda</Accordion.Header>
                            <Row>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>Unificação de Cliente </strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canUnifyCustomer"
                                        checked={form.canUnifyCustomer || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                              <Col md={12}>
                                <Accordion.Body>
                                  <Row>
                                    <Col>
                                      <strong>
                                        Bloquear horário da agenda
                                      </strong>
                                    </Col>
                                    <Col className="text-end">
                                      <Form.Switch
                                        inline
                                        label=" "
                                        name="canBlockAgenda"
                                        checked={form.canBlockAgenda || false}
                                        onChange={handleToggle}
                                      />
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Col>
                            </Row>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 me-2"
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => navigate(-1)}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
