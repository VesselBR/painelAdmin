import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,  
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const actions = ["Create", "View", "Edit", "Delete"];

const labels = {
  View: "Exibir",
  Create: "Criar",
  Edit: "Editar",
  Delete: "Deletar",
};  

const permissoes = [
  {
    titulo: "Gestão",
    permissoes: [
      { label: "Unidade", chave: "Shop" },
      { label: "Níveis de acesso", chave: "Role" },
      { label: "Usuarios", chave: "User" },
    ],
  },
  {
    titulo: "Serviços",
    permissoes: [
      { label: "Serviços", chave: "Service" },
      { label: "Pacotes", chave: "Package" },
    ],
  },
  {
    titulo: "Produtos",
    permissoes: [{ label: "Produtos", chave: "Product" }],
  },
  {
    titulo: "Estoque",
    permissoes: [
      { label: "Inventario", chave: "Inventory" },
      { label: "Entradas por Fornecedor", chave: "Financial" },
      { label: "Saida por Profissional", chave: "Staff" },
    ],
  },

  {
    titulo: "Financeiro",
    permissoes: [
      { label: "Caixa", chave: "Cashier" },
      { label: "Tipos de Pagamentos", chave: "Shop" },
    ],
  },

  {
    titulo: "Comanda",
    permissoes: [
      { label: "Comanda", chave: "Comanda" },
       
    ],
  },
  {
    titulo: "Profissionais",
    permissoes: [
      { label: "Profissional", chave: "Staff" },
       
    ],
  },
  {
    titulo: "Agenda",
    permissoes: [
      { label: "Agenda", chave: "Agenda" },
       
    ],
  },
  {
    titulo: "Clientes",
    permissoes: [
      { label: "Clientes", chave: "Customer" },       
    ],
  },
];

export default function ViewNiveis() {
  const navigate = useNavigate();
  const location = useLocation();

  const { niveis = {} } = location.state || {};
  console.log('achando niveis', niveis)
  return (
    <Container>
      <h1> {niveis.name}</h1>
      <Button
        variant="primary"
        onClick={() => navigate(-1)}
        className="my-3"
      >
        Voltar
      </Button>
      <h1>Niveis de acesso</h1>

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
      {/* //Acesso/ */}
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-acess"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabindex="0"
        >
          <Card className="mb-4 shadow-lg">
            {permissoes.map(({ titulo, permissoes }) => (
              <Card.Body key={titulo}>
                <Row className="my-3">
                  <Card.Title>{titulo}:</Card.Title>
                  <hr />
                  {permissoes.map(({ label, chave }) => (
                    <div key={chave} className="mb-3">
                      <span>{label}:</span>
                      <Row>
                        {actions.map((action) => {
                          const key = `can${action}${chave}`;
                          return (
                            <Col key={key} xs={6} md={3}>
                              <Form.Switch
                                disabled
                                label={labels[action]}
                                name={key}
                                checked={!!niveis[key]}
                               
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  ))}
                </Row>
              </Card.Body>
            ))}
          </Card>
        </div>
      </div>
      {/* Permissoes */}
      <div
        class="tab-pane fade"
        id="nav-permissoes"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
        tabindex="0"
      >
        <Card className="mb-4 shadow-lg">
          <Card.Body>
            <Row className="my-3">
              <Card.Title>Auditoria:</Card.Title>
              <hr />
              <Col>
                <span>Visualizar:</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canViewAudit || false}
                />
              </Col>

              <Col>
                <span>Caixa</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>

              <Col>
                <span>Fechamento de Caixa</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>
            </Row>
          </Card.Body>

          <Card.Body>
            <hr />
            <Card.Title>Comanda:</Card.Title>
            <hr />
            <Row className="my-3">
              <Col md={3} className="my-2">
                <span>Cancelamento de Comanda:</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>

              <Col md={3} className="my-2">
                <span>Estorno de comanda</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>

              <Col md={3} className="my-2">
                <span>Desconto em Serviços</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>

              <Col md={3} className="my-2">
                <h6>Limite de Desconto em Serviços(%)</h6>
                <span>{niveis.productComandaDiscoutLimit || "XX"}</span>
              </Col>

              <Col md={3} className="my-2">
                <span>Desconto em Serviços(%)</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  value={niveis.canCreateShop || false}
                />
              </Col>

              <Col md={3} className="my-2">
                <h6>Limite de Desconto em Serviços(%)</h6>
                <span>{niveis.serviceComandaDiscoutLimit || "XX"}</span>
              </Col>

              <Col md={3} className="my-2">
                <span>Editar preço do serviço</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>
            </Row>
          </Card.Body>

          <Card.Body>
            <hr />
            <Card.Title>Agenda</Card.Title>
            <hr />
            <Row className="my-3">
              <Col>
                <span>Unificação de Cliente :</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>
              <Col>
                <span>Bloquear horário da agenda :</span>
                <Form.Switch
                  disabled
                  label="Criar"
                  name="canCreateShop"
                  checked={niveis.canCreateShop || false}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
