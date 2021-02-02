import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';

import { loadProfile, editProfile } from '../actions/profileActions';

const ProfileEditScreen = ({match}) => {
  const [newProfile, setNewProfile] = useState({
    // username: '',
    // email: '',
    name: '',
  });

  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.loadProfileReducer);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, profile } = profileData;

  let history = useHistory();

  useEffect(() => {
    if(userLogin.userInfo === undefined)
    {
      history.push('/login');
    }
    else
    {
      setNewProfile({ name: userLogin.userInfo.name });
    }
    // TODO: need to get an user id for an active user.
  }, [dispatch]);

  const editProfileHandler = (e) => {
    e.preventDefault();
    const { name } = userLogin.userInfo;

    dispatch(editProfile(newProfile));
    history.push(`/user/profile/${match.params.userId}/show`);
    // TODO: provide a feedback to the user.
  };

  return (
    <Container>
      <h1>Edit profile</h1>
      <Form onSubmit={editProfileHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={newProfile.name}
            onChange={(e) =>
              setNewProfile({ ...newProfile, name: e.target.value })
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
