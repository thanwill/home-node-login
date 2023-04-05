import "../styles/login.css";
import { useState } from "react";

function Login() {
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // atualiza o estado do form
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    let errorMessage = "";

    if (name === "username") {
      if (!checkEmail.test(value)) {
        errorMessage = "Por favor, insira um email válido";
      }
    }else if (name === "password") {
      if (!checkPassword.test(value)) {
        errorMessage = "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula e um númer";
      }
    }

    setError(errorMessage);


  };

  // envia os dados para o backend
  const handleSubmit = async e => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <form
        action=''
        className='login'
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={form.username}
          onChange={e => setForm(e.target.value)}
          onBlur={e => handleChange(e)}
        />
        <span id='message'>
          {error ? "Email inválido" : ""} 
        </span>
        <input
          type='password'
          placeholder='Password'
          name="password"
          value={form.password}
          onChange={e => setForm(e.target.value)}
          onFocus={e => handleChange(e)}
        />
        <span id='message'>
          {error ? "Senha inválida" : ""}
        </span>
        <button type='submit' value='Login'>
          Logar
        </button>
      </form>
    </div>
  );
}

export default Login;
