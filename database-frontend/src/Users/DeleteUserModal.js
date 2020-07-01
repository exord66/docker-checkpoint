import React, { useState, useEffect } from 'react'
import {
  Modal,
  Button
} from 'react-bootstrap'

import AlertDismissible from '../Common/Alert'

const DeleteUserModal = ({
  reload,
  user_id,
  first_name,
  last_name,
  addAlert
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteUser, setDeleteUser] = useState(null)

  useEffect(() => {
    // Prevent render on page load
    if (deleteUser) {
      fetch(`http://localhost:3001/users/${deleteUser}`, {
        method: 'Delete',
      })
        .then(res => res)
        .then(json => {
          setDeleteUser(null)
          addAlert(<AlertDismissible
            variant="success"
            title="Success"
            message={`Successfully deleted user with ID: ${deleteUser}`}
            duration={5000}
          />)
        })
    }
  }, [deleteUser, addAlert])

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {first_name} {last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deleting this user is unreversable, are you sure you want to delete them?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            setDeleteUser(user_id)
            handleClose()
            reload(true)
          }}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUserModal