import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';
import FormContainer from '../components/FormContainer';

import { loadState } from '../localStorage';
import { login, loginWithGoogle } from '../redux/actions/userActions';

const LoginScreen = ({ history }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || loadState('userInfo')) {
      history.push('/');
    }
  }, [history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginInfo.email, loginInfo.password));
  };

  const googleOAuthHandler = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter E-mail"
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Button onClick={googleOAuthHandler}>Login with Google</Button>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
