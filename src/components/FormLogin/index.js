// importa o pacote do boostrap para criar um formulario de login
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default function FormLogin() {
  return (
    <div className='formulario mt-5'>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Digite seu email' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Senha</Form.Label>
          <Form.Control type='password' placeholder='Digite sua senha' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Entrar
        </Button>

        <Link to='/register' className='btn btn-link'>
          Cadastrar
        </Link>
      </Form>
    </div>
  );
}
