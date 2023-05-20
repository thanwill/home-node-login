import React, { useState } from "react";
import ModalAction from "../Modal";
import ModalEdit from "../ModalEdit";
import TitleText from "../TitleText";

export default function ListUsers({ usuarios }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <TitleText title='Lista de Usuários' />
            <table className='table table-striped align-middle'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Nome</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.nome}</td>
                    <td>
                      {
                        // oculta parte do email do usuário
                        user.email.replace(/^(.{3})(.*)(@.*)$/, "$1...$3")
                      }
                    </td>
                    <td>
                      <div
                        class='btn-group'
                        role='group'
                        aria-label='Basic outlined example'>
                        <button type='button' class='btn btn-outline-primary'>
                          Editar
                        </button>
                        <button
                          type='button'
                          class='btn btn-outline-primary'
                          onClick={handleShowModal}>
                          Excluir
                        </button>
                        <button type='button' class='btn btn-outline-primary'>
                          Visualizar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalAction
        show={showModal}
        handleClose={handleCloseModal}
        Title={`Excluir usuário`}
        Body={`Tem certeza que deseja excluir o usuário?`}
        Footer={"Excluir"}
      />
    </>
  );
}
