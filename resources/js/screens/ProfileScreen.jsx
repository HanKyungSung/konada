import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';

import { loadProfile } from '../actions/profileActions';

const ProfileScreen = ({ match }) => {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.loadProfileReducer);
  const { loading, error, profile } = profileData;

  useEffect(() => {
    dispatch(loadProfile(match.params.userId));
  }, [dispatch, match]);
  // TODO: if no userId is given, load the active user's profile by default.

  return (
    <Container>
      <h1>Profile</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <p>Hi, {profile === null ? '' : profile.username}</p>
            {/* I really don't like this way of reading data. */}
          </Row>
          <Row>
            <Link to={`/user/profile/${match.params.userId}/edit`}>
              Edit profile
            </Link>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
