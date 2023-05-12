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
                        // exibe o email nesse formato jonat******@gmail.com
                        user.email.substring(0, 6) +
                          "***" +
                          user.email.substring(
                            user.email.indexOf("@"),
                            user.email.length
                          )
                      }
                    </td>
                    <td>
                      <div className='row'>
                        <div className='col-md-3'>
                          <button
                            className='btn btn-danger'
                            onClick={() => handleDelete(user.id)}>
                            Excluir
                          </button>
                        </div>
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
