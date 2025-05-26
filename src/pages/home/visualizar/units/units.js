import React from "react";
import { useState, useEffect, useCallback } from "react";

import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "../../../../components/Table/table";
import { toast } from "react-toastify";
import { getShops, createShops } from "../../../../services/apiTenants";
import { formUnitsInitialState } from "../../../../components/Forms/Forms";


export default function Units() {
  const navigate = useNavigate();
  const location = useLocation();
  const { empresas = {} } = location.state || {};
  const [unidades, setUnidades] = useState(false);
  const [errors, setErrors] = useState({});

  //colunas da empresa
  const [colunas] = useState(
    empresas?.id
      ? [
          { header: "ID", accessor: "id" },
          { header: "Empresa", accessor: "name" },
          { header: "Cidade", accessor: "city" },
        ]
      : []
  );

  //coluna da unidades
  const [colunasUnits] = useState([
    { header: "ID", accessor: "id" },
    { header: "Unidades", accessor: "name" },
    { header: "Cidade", accessor: "city" },
  ]);

  // dados da linha da empresa
  const [dados, setDados] = useState([
    {
      id: empresas.id,
      name: empresas.name,
      cidade: empresas.city || "",
    },
  ]);

  //dados das linhas das unidades
  const [dadosUnits, setDadosUnits] = useState([

  ]);
  
  // form que monta/ atualiza as unidades
  const [form, setForm] = useState(formUnitsInitialState);
  
  
  //pega o id vindo do location (tela empresa)
  const units = useCallback( async () => {
    const tenantId = empresas.id;
    try {
      const response = await getShops(tenantId);
      const item = response.data;
      // console.log("peter", response.data);
      setDadosUnits(item);
      //setDadosUnits(unitsData);
      console.log("testando usuarios", form);
    } catch (erro) {
      console.log(erro, "erro ao carregar units");
    }
  }, [empresas , form])
  
  //carrega a tebela de unidades com base no id da empresa vindo via location (tela empresa)
  useEffect(() => {
    if (empresas && empresas.id) {
      units();
    }
  }, [empresas, units]);
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buscarEnderecoPorCEP = async (cep) => {
    const isValidCEP = (cep) => /^\d{5}-?\d{3}$/.test(cep);
    const cepLimpo = cep.replace(/\D/g, "");

    if (!isValidCEP(cepLimpo)) {
      throw new Error("CEP inválido");
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    return data;
  };

  const handleConsultarCEP = async () => {
    try {
      const data = await buscarEnderecoPorCEP(form.zip_code);
      setForm((prev) => ({
        ...prev,
        address_name: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }));
    } catch (error) {
      toast.error(error.message); // ou setErrors({ zip_code: error.message });
    }
  };

  const handleSubmit = async (e) => {
    //debugger;
    e.preventDefault();
    const newErrors = {};

    if (!form.name) newErrors.name = "Preencha campo Nome";
    if (!form.address_name) newErrors.address_name = "Preencha campo Endereço";
    if (!form.address_nunmber) newErrors.address_nunmber = "Preencha campo Numero";
    if (!form.zip_code) newErrors.zip_code = "Preencha campo CEP";
    if (!form.bairro) newErrors.bairro = "Preencha campo Bairro";
    if (!form.neighborhood) newErrors.neighborhood = "Preencha campo Cidade";
    if (!form.state) newErrors.state = "Preencha campo Estado";
    
    setErrors(newErrors);
    
    //const nextId = Math.max(...dadosUnits.map((item) => item.id || 0), 0) + 1;
    const tenantId = empresas.id;
    const unitsData = {
      ...form,
      tenant_id: tenantId,
      //id: nextId,
       // id (calculado pela api)
      // tenant_id: tenantId, // id da empresa
      // name: form.name, // nome da unidade
      // city: form.city,
      // address_name: form.address_name,
      // address_nunmber: form.address_nunmber,
      // zip_code: form.zip_code,
      // neighborhood: form.neighborhood,
      // state: form.state,
    };
    setDadosUnits((prev) => [...prev, unitsData]);
   
    try {
      await createShops(tenantId ,unitsData);
      console.log("nova unidade", unitsData);
      setForm(formUnitsInitialState);
    }catch (erro) {
      console.log("erro ao criar novo usuario", erro);
    }
    //if (Object.keys(newErrors).length === 0) {}
  };

  const handleExcluir = (row) => {
    setDados((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleEditar = (unidades, origem) => {
    if(origem === "unidades"){
      navigate(`/editUnits/`, { state: { unidades } });
    } else if (origem === "empresas"){
      navigate(`/edit`, { state: { unidades } });

    }
  };

  const handleView = (unidades, origem) => {
    if (origem === "unidades") {
      navigate(`/viewUnits/`, { state: { unidades } });
    } else if (origem === "empresas") {
      navigate(`/visualizar`, { state: { unidades } });
    }
  };

  return (
    <Container>
      <h1>Unidades {empresas.name}</h1>
      <Col md={6}>
        <Row className="justify-content-start ">
          <Button className="col-auto m-2" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button className="col-auto m-2" onClick={() => setUnidades(true)}>
            Nova Unidade
          </Button>
        </Row>
      </Col>

      <Table
        columns={colunas}
        data={dados}
        onEdit={(item) => handleEditar(item, "empresas")}
        onDelete={handleExcluir}
        onView={(item) => handleView(item, "empresas")}
      />
      <Table
        columns={colunasUnits}
        data={dadosUnits}
        onEdit={(item) => handleEditar(item , "unidades")}
        onDelete={handleExcluir}
        onView={(item) => handleView(item, "unidades")}
      />
      {unidades ? (
        <Card className="my-3">
          <Card.Body>
            <h2>Nova Unidade</h2>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={10}>
                    <Form.Group controlId="address_name">
                      <Form.Label>Endereço:</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_name"
                        value={form.address_name}
                        onChange={handleChange}
                        isInvalid={!!errors.address_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId="address_nunmber">
                      <Form.Label>Numero:</Form.Label>
                      <Form.Control
                        type="number"
                        name="address_nunmber"
                        value={form.address_nunmber}
                        onChange={handleChange}
                        isInvalid={!!errors.address_nunmber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address_nunmber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="zip_code">
                      <Form.Label>CEP</Form.Label>
                      <Form.Control
                        type="text"
                        name="zip_code"
                        value={form.zip_code}
                        onChange={handleChange}
                        isInvalid={!!errors.zip_code}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zip_code}
                      </Form.Control.Feedback>
                      <Button className="my-1" onClick={handleConsultarCEP}>
                        Consultar
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col md={8}>
                    <Form.Group controlId="neighborhood">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control
                        type="text"
                        name="neighborhood"
                        value={form.neighborhood}
                        onChange={handleChange}
                        isInvalid={!!errors.neighborhood}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.neighborhood}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={10}>
                    <Form.Group controlId="city">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId="estado">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
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
              onClick={() => setUnidades(false)}
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
