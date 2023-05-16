import { useState } from "react";
import "./styles.css";
import { Button, Form } from "react-bootstrap";

export default function FormLogin() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <div className='container'></div>
      <Form
        noValidate
        validated={validated}
        className='col-12 col-md-6 offset-md-3 needs-validation'
        onChange={e => {
          // captura o foco de cada input e valida se o pattern está correto ou não adicionando a classe is-invalid ou is-valid

          if (e.target.value !== "") {
            if (e.target.validity.valid) {
              e.target.classList.remove("is-invalid");
              e.target.classList.add("is-valid");
            } else {
              e.target.classList.remove("is-valid");
              e.target.classList.add("is-invalid");
            }
          }
        }}>
        <h1 className='h3 mb-3 fw-normal mb-5'>
          Faça login! <br />
        </h1>
        <div
          className='form-floating mb-3 has-validation'
          controlId='validationEmail'>
          <input
            type='email'
            className='form-control'
            id='signemail'
            placeholder='E-mail'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
          />
          <label for='signemail'>Email address</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            id='signsenha'
            name='signsenha'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          />
          <label for='signsenha'>Password</label>
        </div>
        <Button type='submit'>Sign in</Button>
        <p className='mt-5 mb-3 text-muted'>© 2017–2021</p>
      </Form>
    </>
  );
}
