import React, { useState, useEffect } from "react";
import { newUser } from "../../services/auth";
import { getAllUsers } from "../../services/users";

export default function FormSignIn() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    csenha: "",
    nascimento: "",
    cpf: "",
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

    try {
      if (user.senha !== user.csenha) {
        setError("As senhas não são iguais");
        return;
      }
      const response = await newUser(user);

      if (response.success) {
        setSuccess(response.success);
      } else {
        setError(response.error);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError("Não foi possível conectar ao servidor");
      } else {
        setError("Ocorreu um erro na requisição");
      }
    }
  };

  return (
    <div className='container'>
      <form className='col-12 col-md-4 offset-md-4 mt-5'>
        <h1 class='h3 mb-3 fw-normal'>Cadastre-se agora!</h1>
        {success && <div className='alert alert-success'>{success}</div>}

        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='nome'
            name='nome'
            placeholder='Nome completo'
            onChange={handleInputChange}
          />
          <label for='nome'>Nome e sobrenome</label>
        </div>

        <div class='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='name@example.com'
            onChange={handleInputChange}
          />
          <label for='email'>E-mail</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='senha'
            name='senha'
            placeholder='Senha'
            onChange={handleInputChange}
          />
          <label htmlFor='senha' className='form-label'>
            Senha
          </label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='csenha'
            name='csenha'
            placeholder='Confirme a senha'
            onChange={handleInputChange}
          />
          <label htmlFor='csenha' className='form-label'>
            Confirme a senha
          </label>
        </div>

        {/* Input de aniversario/nascimento */}

        <div className='mb-3'>
          <label htmlFor='nascimento' className='form-label mb-3'>
            Data de nascimento
          </label>
          <input
            type='date'
            className='form-control'
            id='nascimento'
            name='nascimento'
            placeholder={Date.now()}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='cpf'
            name='cpf'
            placeholder='102.103.104-05'
            onChange={handleInputChange}
          />
          <label htmlFor='cpf' className='form-label'>
            CPF
          </label>
        </div>

        {
          // mostra a mensagem de erro por 3 segundos

          error &&
            setTimeout(() => {
              setError("");
            }, 3000) && <div className='alert alert-danger'>{error}</div>
        }

        <div className='mt-5'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
