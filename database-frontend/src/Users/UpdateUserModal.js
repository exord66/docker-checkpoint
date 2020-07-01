import React, { useState, useEffect } from 'react'
import {
  Modal,
  Form,
  Button
} from 'react-bootstrap'

import AlertDismissible from '../Common/Alert'


const UpdateUserModal = ({
  reload,
  user_id,
  first_name,
  last_name,
  email,
  addAlert
}) => {
  const [form, setForm] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email
  })

  const [updateUser, setUpdateUser] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    // Prevent render on page load
    if (updateUser) {
      fetch(`http://localhost:3001/users/${user_id}`, {
        method: 'put',
        body: JSON.stringify(updateUser),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res)
        .then(json => {
          console.log(json)
          setUpdateUser(null)
          addAlert(<AlertDismissible
            variant="success"
            title="Success"
            message={`Successfully added user with ID: ${user_id}`}
            duration={5000}
          />)
        })
    }
  }, [updateUser, user_id, addAlert])

  return (
    <React.Fragment>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="first_name"
                onChange={onChange}
                defaultValue={form.first_name}
              />
            </Form.Group>
            <Form.Group controlId="formGroupLastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="last_name"
                onChange={onChange}
                defaultValue={form.last_name}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={onChange}
                defaultValue={form.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
          <Button
            variant="warning"
            onClick={() => {
              setUpdateUser({
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email
              })
              handleClose()
              reload(true)
            }}>
            Submit
        </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default UpdateUserModal