import React, { useState } from "react";
import { newUser } from "../../services/auth";

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
      <form className=' col-12 mt-5'>
        {success && <div className='alert alert-success'>{success}</div>}

        <div className='mb-3'>
          <label htmlFor='nome' className='form-label'>
            Nome
          </label>
          <input
            type='text'
            className='form-control'
            id='nome'
            name='nome'
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
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
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='csenha' className='form-label'>
            Confirme a senha
          </label>
          <input
            type='password'
            className='form-control'
            id='csenha'
            name='csenha'
            onChange={handleInputChange}
          />
        </div>

        {/* Input de aniversario/nascimento */}

        <div className='mb-3'>
          <label htmlFor='nascimento' className='form-label'>
            Data de nascimento
          </label>
          <input
            type='date'
            className='form-control'
            id='nascimento'
            name='nascimento'
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='cpf' className='form-label'>
            CPF
          </label>
          <input
            type='text'
            className='form-control'
            id='cpf'
            name='cpf'
            onChange={handleInputChange}
          />
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
