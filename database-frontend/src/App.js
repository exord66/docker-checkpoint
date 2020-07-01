import React, { useState, useReducer } from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import {
  Nav,
  Navbar,
  Form,
  Button,
} from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';


import UsersTable from './Users/UsersTable'

function Home() {
  return (
    <React.Fragment>
      <h1 className="header">E-commerce App</h1>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </React.Fragment>
  );
}

const fakeLogin = async ({ username, password }) => {
  console.log(username, password)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'joshc' && password === 'password') {
        resolve()
      } else {
        reject()
      }
    }, 1000)
  })
}

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.value
      }
    }
    case 'login': {
      return {
        ...state,
        error: '',
        showLoading: true
      }
    }
    case 'success': {
      return {
        ...state,
        isLoggedIn: true,
        showLoading: false,
      }
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password',
        isLoggedIn: false,
        showLoading: false,
        username: '',
        password: ''
      }
    }
    case 'logout': {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: ''
      }
    }
    default:
      return state
  }
}

const initialState = {
  username: '',
  password: '',
  showLoading: false,
  error: '',
  isLoggedIn: false,
}

const StateContext = React.createContext()
const DispatchContext = React.createContext()

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, showLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'login' });

    try {
      await fakeLogin({ username, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <>
          <h1>Welcome {username}</h1>
          <Button onClick={() => dispatch({ type: 'logout' })}>Log out</Button>
        </>
      ) : (
          <Form onSubmit={onSubmit}>
            {error && <p>Error: {error}</p>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => dispatch({ type: 'field', fieldName: 'username', value: e.currentTarget.value })}
              />
              <Form.Text className="text-muted">
                We'll never share your info with anyone else.
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => dispatch({ type: 'field', fieldName: 'password', value: e.currentTarget.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={showLoading}>
              {showLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        )}
    </React.Fragment>
  )
}

const HereButton = () => {
  let history = useHistory()

  return (
    <Button
      variant='primary'
      onClick={() => { history.push('/here') }}
    >Go Here</Button>
  )
}

const App = () => {
  const [alerts, setAlerts] = useState([])
  const addAlert = (alertComponent) => {
    setAlerts([...alerts, alertComponent])
  }

  return (
    <DispatchContext.Provider value={{}}>
      <StateContext.Provider value={{}}>
        <BrowserRouter>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand>EC</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/users">
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customers">
                  <Nav.Link>Customers</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/manufacturers">
                  <Nav.Link>Manufacturers</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/items">
                  <Nav.Link>Items</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="justify-content-end">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Container className="p-3">
            {alerts}
            <Jumbotron>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/users">
                  <UsersTable addAlert={addAlert} />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Jumbotron>
          </Container>
        </BrowserRouter>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
