import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';

import { loadUserInfo, editUserInfo } from '../redux/actions/userActions';

const ProfileEditScreen = ({ match }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    // username: '',
    // email: '',
    name: '',
  });

  let history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.loadUserInfoReducer);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo === undefined) {
      history.push('/login');
    } else {
      setNewUserInfo({ name: userInfo.name });
    }
  }, [dispatch]);

  const editUserInfoHandler = (e) => {
    e.preventDefault();
    const { name } = userInfo;

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
        <Button type="submit" variant="primary" className="btn-dark">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileEditScreen;
