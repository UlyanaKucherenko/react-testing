import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [ users, setUsers ] = useState([]);

  const loudUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  };

  useEffect(() => {
    loudUsers();
  }, []);

  return (
    <>
      <h2>Users :</h2>
      <div>
        {users && users.map((user) => <div key={user.id}>{user.id}</div>)}
      </div>
    </>
  );
};
export default Users;