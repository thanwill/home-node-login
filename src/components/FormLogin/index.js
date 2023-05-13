import { useState } from "react";
import "./styles.css";

export default function FormLogin() {
  const [user, setUser] = useState({
    signemail: "",
    signsenha: "",
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
    <>
      <div className='container'></div>

      <main class='form-signin'>
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
        <form className='col-12 col-md-4 offset-md-4 mt-5'>
          <h1 class='h3 mb-3 fw-normal'>Entre agora.</h1>
          <div class='form-floating mb-3'>
            <input
              type='email'
              class='form-control'
              id='signemail'
              placeholder='name@example.com'
              onChange={handleInputChange}
            />
            <label for='signemail'>Email address</label>
          </div>
          <div class='form-floating mb-3'>
            <input
              type='password'
              class='form-control'
              placeholder='Password'
              id='signsenha'
              name='signsenha'
              onChange={handleInputChange}
              value={user.senha}
            />
            <label for='signsenha'>Password</label>
          </div>

          <button class='w-100 btn btn-lg btn-primary' onClick={handleSubmit}>
            Sign in
          </button>
          <p class='mt-5 mb-3 text-muted'>© 2017–2021</p>
        </form>
      </main>
    </>
  );
}
