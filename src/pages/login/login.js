import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/authContext";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Usando uma string para a mensagem de erro
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "teste@exemplo.com" && password === "123456") {
      login();
      setErrorMessage(""); // Limpa qualquer mensagem de erro anterior
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.clear();
      }
      navigate("/home");
    } else {
      setErrorMessage("Email ou senha inválidos!"); // Define a mensagem de erro
      setTimeout(() => {
        setErrorMessage(""); // Limpa a mensagem de erro após 1 segundo (opcional)
      }, 1000);
      // Não redireciona automaticamente aqui
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="">
      <nav className="bg-dark py-3">
        <div className="container text-center">
          <img src="\assets\img\logo-home.svg" alt="Logo Vessel" width={150} />
        </div>
      </nav>

      <div className="bg-light bg-login py-3 ">
        <div className="container form-login col-sm-12 col-md-5">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}{" "}
            {/* Exibe a mensagem de erro */}
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                name="username"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-dark w-100 p-2 ">
              Login
            </button>
            <div className="text-center py-3">
              <span>
                <a className=" text-decoration-none" href="#">
                  Sing-up
                </a>
              </span>
              <br />
              <span>
                <a className=" text-decoration-none" href="">
                  Forgot your password?
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
