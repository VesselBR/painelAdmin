import React, { useState, useEffect } from "react";
import Table from "../../../components/Table/table";
import { getUsers } from "../../../services/apiTest";
import * as bootstrap from "bootstrap";

export default function Cadastro() {
  const [dados, setDados] = useState([]);
  const [colunas, setColunas] = useState([
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "nome" },
    { header: "E-mail", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    { header: "Nome Perfil", accessor: "username" },
    { header: "Site", accessor: "website" },
  ]);

  const users = async () => {
    try {
      const response = await getUsers();
      console.log(response.data, "todos os usuarios");
      const adapt = response.data.map((item) => ({
        id: item.id,
        nome: item.name,
        email: item.email,
        phone: item.phone,
        username: item.username,
        website: item.website,
      }));
      setDados(adapt);
    } catch (erro) {
      console.log(erro, "erro ao trazer dados dos usuarios");
    }
  };

  useEffect(() => {
    users();
  }, []);

  //const [novaColuna, setNovaColuna] = useState("");
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleEditar = (row) => {
    console.log("Editar:", row);
    // Aqui você pode abrir um modal de edição se quiser
    setClienteEditando(row);

    // Abrir modal manualmente (usando Bootstrap)
    const modal = new bootstrap.Modal(
      document.getElementById("modalEditarCliente")
    );
    modal.show();
  };
  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    setDados((prev) =>
      prev.map((item) =>
        item.id === clienteEditando.id ? clienteEditando : item
      )
    );
    setClienteEditando(null); // Limpa o formulário após salvar
  };

  const handleExcluir = (row) => {
    setDados((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdicionarCliente = (e) => {
    e.preventDefault();
    const novoCliente = {
      id: dados.length + 1, // ou usar algum UUID
      nome: formData.nome,
      email: formData.email,
    };
    setDados([...dados, novoCliente]);
    setFormData({ nome: "", email: "" }); // limpa o formulário
  };

  // const handleAdicionarColuna = (e) => {
  //     e.preventDefault();

  //     if (!novaColuna) return;

  //     const novoAccessor = novaColuna.toLowerCase().replace(/\s/g, "_");

  //     // Adiciona nova coluna no array de colunas
  //     setColunas((prev) => [...prev, { header: novaColuna, accessor: novoAccessor }]);

  //     // Adiciona a nova propriedade nos dados já existentes
  //     setDados((prev) =>
  //         prev.map((cliente) => ({
  //         ...cliente,
  //         [novoAccessor]: "", // valor vazio inicial
  //         }))
  //     );

  //     setNovaColuna(""); // limpa o campo do modal
  // };

  return (
    <div className=" mt-4">
      <h3>Cadastro</h3>

      {/* Botão para abrir modal */}
      <div className="row row-cols-2 col-sm-3 justify-content-between ms-1">
        <button
          className="btn bg-btn-default mb-3 btn-sm col-sm-9 col-md-auto"
          data-bs-toggle="modal"
          data-bs-target="#modalAdicionarCliente"
        >
          + Adicionar Cliente
        </button>
        {/* <button
            className="btn btn-primary mb-3 btn-sm col-sm-5"
            data-bs-toggle="modal"
            data-bs-target="#modalAdicionarColuna"
          >
            + Adicionar Coluna
          </button> */}
      </div>

      <Table
        columns={colunas}
        data={dados}
        onEdit={handleEditar}
        onDelete={handleExcluir}
      />

      {/* Modal para adicionar cliente */}
      <div
        style={{ marginTop: "10%" }}
        className="modal fade"
        id="modalAdicionarCliente"
        tabIndex="-1"
        aria-labelledby="modalAdicionarClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAdicionarCliente}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalAdicionarClienteLabel">
                  Novo Cliente
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn bg-btn-default"
                  data-bs-dismiss="modal"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Edição   */}
      <div
        style={{ marginTop: "5%" }}
        className="modal fade"
        id="modalEditarCliente"
        tabIndex="-1"
        aria-labelledby="modalEditarClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSalvarEdicao}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalEditarClienteLabel">
                  Editar Cliente
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                {colunas.map((col) => {
                  if (col.accessor === "id") return null; // não queremos editar o ID

                  return (
                    <div className="mb-3" key={col.accessor}>
                      <label className="form-label">{col.header}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={clienteEditando?.[col.accessor] || ""}
                        onChange={(e) =>
                          setClienteEditando({
                            ...clienteEditando,
                            [col.accessor]: e.target.value,
                          })
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn bg-btn-default"
                  data-bs-dismiss="modal"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal para adicionar coluna
      <div
        style={{marginTop:"10%"}}
        className="modal fade"
        id="modalAdicionarColuna"
        tabIndex="-1"
        aria-labelledby="modalAdicionarColunaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAdicionarColuna}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalAdicionarColunaLabel">Novo Cliente</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                    type="text"
                    name="novaColuna"
                    className="form-control"
                    value={novaColuna}
                    onChange={(e) => setNovaColuna(e.target.value)}
                    required
                    />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}
