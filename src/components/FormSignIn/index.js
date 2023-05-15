import React, { useState, useEffect } from "react";
import { newUser } from "../../services/auth";
import { getAllUsers } from "../../services/users";
import { Form } from "react-bootstrap";

export default function FormSignIn() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    csenha: "",
    nascimento: "",
    cpf: "",
  });

  // funçao para pegar os dados do input
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log(user);
    }

    setValidated(true);
  };

  const handleCpf = event => {
    // adiciona mascara de cpf
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setUser({ ...user, cpf: cpf });
  };

  return (
    <div className='container'>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='col-12 col-md-6 offset-md-3 needs-validation'
        novalidate
        onClick={handleSubmit}>
        <h1 class='h3 mb-3 fw-normal mb-5'>Cadastre-se agora!</h1>
        <div className='form-floating mb-3 has-validation'>
          <input
            type='text'
            className='form-control'
            id='nome'
            name='nome'
            placeholder='Nome completo'
            pattern='[A-Za-z]{3,} [A-Za-z]{3,}'
            required
            onChange={handleInputChange}
          />
          <label for='nome'>Nome e sobrenome</label>
        </div>

        <div class='form-floating mb-3 has-validation'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='E-mail'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            onChange={handleInputChange}
          />
          <label for='email'>E-mail</label>
        </div>

        <div className='form-floating mb-3 has-validation'>
          <input
            type='password'
            className='form-control'
            id='senha'
            name='senha'
            placeholder='Senha'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            onChange={handleInputChange}
          />
          <label htmlFor='senha' className='form-label'>
            Senha
          </label>
        </div>
        <div className='form-floating mb-3 has-validation'>
          <input
            type='password'
            className='form-control'
            id='csenha'
            name='csenha'
            placeholder='Confirme a senha'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            onChange={handleInputChange}
          />
          <label htmlFor='csenha' className='form-label'>
            Confirme a senha
          </label>
        </div>

        {/* Input de aniversario/nascimento */}

        <div className='mb-3 has-validation'>
          <label htmlFor='nascimento' className='form-label mb-3'>
            Data de nascimento
          </label>
          <input
            type='date'
            className='form-control'
            id='nascimento'
            name='nascimento'
            pattern='\d{2}/\d{2}/\d{4}'
            placeholder={new Date().toLocaleDateString()}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-floating mb-3 has-validation'>
          <input
            type='text'
            className='form-control'
            id='cpf'
            name='cpf'
            placeholder='CPF'
            pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
            value={user.cpf}
            onChange={event => {
              handleInputChange(event);
              handleCpf(event);
            }}
          />
          <label htmlFor='cpf' className='form-label'>
            CPF
          </label>
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </Form>
    </div>
  );
}
