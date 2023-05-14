import { getAllUsers, deleteById } from "../../services/users";
import { useEffect, useState } from "react";

export default function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    loadUsers();
  }, []);

  const handleDelete = async id => {
    await deleteById(id);
    const response = await getAllUsers();
    setUsers(response);
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
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
                {users.map(user => (
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
                        <button type='button' class='btn btn-outline-primary'>
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
    </>
  );
}
