import React, { useState, useEffect } from 'react'
import {
  Table,
  Spinner
} from 'react-bootstrap'

import DeleteUserModal from './DeleteUserModal'
import AddUserModal from './AddUserModal'
import UpdateUserModal from './UpdateUserModal'
import AlertDismissible from '../Common/Alert'

function UsersPage({
  addAlert
}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    if (refresh) {
      fetch("http://localhost:3001/users")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            setRefresh(false)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            addAlert(
              <AlertDismissible
                variant="danger"
                title="Error"
                message={error.message}
                duration={5000}
              />
            )
          }
        )
    }
  }, [refresh])

  const usersTableBody = (
    <tbody>
      {items.map((item, index) => (
        <tr key={index} id={item.user_id}>
          <td id={item.user_id}>{item.first_name}</td>
          <td id={item.user_id}>{item.last_name}</td>
          <td id={item.user_id}>{item.email}</td>
          <td>
            <UpdateUserModal
              user_id={item.user_id}
              first_name={item.first_name}
              last_name={item.last_name}
              email={item.email}
              reload={setRefresh}
              addAlert={addAlert}
            />
            {' '}
            <DeleteUserModal
              user_id={item.user_id}
              first_name={item.first_name}
              last_name={item.last_name}
              reload={setRefresh}
              addAlert={addAlert}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Spinner animation="border" />;
  } else {
    return (
      <React.Fragment>
        <h1 className="header">EC Users</h1>
        <AddUserModal
          first_name=''
          last_name=''
          current_email=''
          reload={setRefresh}
          addAlert={addAlert}
        />
        <hr />
        <Table hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {usersTableBody}
        </Table>
      </React.Fragment>
    );
  }
}

export default UsersPage