import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import { loadUserInfo, editUserInfo } from '../redux/actions/userActions';

const ProfileEditScreen = ({ match }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    name: '',
    username: '',
    address: '',
    phone_number: '',
    email: '',
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.loadUserInfoReducer);
  const { loading, error, userInfo } = userLogin;

  let history = useHistory();

  useEffect(() => {
    if (userInfo === undefined) {
      history.push('/login');
    } else {
      setNewUserInfo({
        name: userInfo.name,
        username: userInfo.username,
        address: userInfo.address,
        phone_number: userInfo.phone_number,
        email: userInfo.email,
      });
    }
  }, [dispatch]);

  const editUserInfoHandler = (e) => {
    e.preventDefault();
    dispatch(editUserInfo(newUserInfo));
    history.push(`/user/profile/${userInfo.id}/show`);
    // TODO: provide a feedback to the user.
  };

  return (
    <Container>
      <h1>Edit profile</h1>
      <Form onSubmit={editUserInfoHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={newUserInfo.name}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={newUserInfo.username}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={newUserInfo.address}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, address: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="phone_number">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={newUserInfo.phone_number}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, phone_number: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            value={newUserInfo.email}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, email: e.target.value })
            }
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-dark">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileEditScreen;
