import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAction({ show, handleClose, Title, Body, Footer, Confirm }) {
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
          <p>{Body}</p>
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

export default ModalAction;
