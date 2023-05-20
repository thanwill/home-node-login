import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";
import FormSignIn from "../FormSignIn/index";
export default function ModalEdit({
  user,
  show,
  handleClose,
  Title,
  Body,
  Footer,
  Confirm,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size='sm'
        backdrop='static'>
        <Modal.Header>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            // vai pegar o user e vai mostrar os dados dele no modal em forma de input para ser editado
          }
          <FormSignIn user={user} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant='primary'
            // passa a funçao que vai ser executada ao clicar no botao
            onClick={handleClose}>
            {Footer}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
