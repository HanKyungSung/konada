import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';

import { loadProfile, editProfile } from '../redux/actions/profileActions';

const ProfileEditScreen = (match) => {
  const [newProfile, setNewProfile] = useState({
    username: '',
    name: '',
    email: '',
  });

  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.loadProfileReducer);
  const { loading, error, profile } = profileData;

  let history = useHistory();

  useEffect(() => {
    dispatch(loadProfile(1));
    // TODO: need to get an user id for an active user.
  }, [dispatch]);

  const editProfileHandler = (e) => {
    e.preventDefault();
    dispatch(editProfile(newProfile));
    history.push(`/user/profile/${match.match.params.userId}/show`);
    // why two matches?
    // TODO: provide a feedback to the user.
  };

  return (
    <Container>
      <h1>Edit profile</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form onSubmit={editProfileHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={newProfile.username}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newProfile.name}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={newProfile.email}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, email: e.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-dark">
              Submit
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ProfileEditScreen;
