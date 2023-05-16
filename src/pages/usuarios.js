import { getAllUsers } from "../components/services/users";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    loadUsers();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Usuários</h1>
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
                    <td>{user.email}</td>
                    <td>
                      <div className='row'>
                        <div className='col-md-3'>
                          <button className='btn btn-danger'>Excluir</button>
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
