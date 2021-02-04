import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';
import FormContainer from '../components/FormContainer';

import { register } from '../redux/actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [regInfo, setRegInfo] = useState({
    name: '',
    username: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (regInfo.password !== regInfo.password_confirmation) {
      setMessage('Passwords do not match');
      // TODO: does this have to be a state?
    } else {
      dispatch(
        register(
          regInfo.name,
          regInfo.username,
          regInfo.address,
          regInfo.phone_number,
          regInfo.email,
          regInfo.password,
          regInfo.password_confirmation
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {/* {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />} */}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={regInfo.name}
            onChange={(e) => setRegInfo({ ...regInfo, name: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            value={regInfo.username}
            onChange={(e) =>
              setRegInfo({ ...regInfo, username: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter Address"
            value={regInfo.address}
            onChange={(e) =>
              setRegInfo({ ...regInfo, address: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone_number">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="phone_number"
            placeholder="Enter Phone Number"
            value={regInfo.phone_number}
            onChange={(e) =>
              setRegInfo({ ...regInfo, phone_number: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter E-mail"
            value={regInfo.email}
            onChange={(e) => setRegInfo({ ...regInfo, email: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={regInfo.password}
            onChange={(e) =>
              setRegInfo({ ...regInfo, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password_confirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={regInfo.password_confirmation}
            onChange={(e) =>
              setRegInfo({ ...regInfo, password_confirmation: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
