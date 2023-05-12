import { Form, Button } from "react-bootstrap";
import { login } from "../../services/auth";
import { useState } from "react";
import "./styles.css";

export default function FormLogin() {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // funçao para pegar os dados do input
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // funçao para enviar os dados para o backend
  const handleSubmit = async event => {
    event.preventDefault();
    alert("teste");
  };

  return (
    <div className='container'>
      <form>
        {error && (
          <div className='alert alert-danger'>
            {error}
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={() => setError("")}></button>
          </div>
        )}
        {success && (
          <div className='alert alert-success'>
            {success}
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={() => setSuccess("")}></button>
          </div>
        )}

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='senha' className='form-label'>
            Senha
          </label>
          <input
            type='password'
            className='form-control'
            id='senha'
            name='senha'
            value={user.senha}
            onChange={handleInputChange}
          />
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
