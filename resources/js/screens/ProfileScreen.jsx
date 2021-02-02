import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';

import { loadUserInfo } from '../redux/actions/userActions';

const ProfileScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo === undefined) {
      history.push('/login');
    }

    dispatch(loadUserInfo(userInfo));
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
            <p>Hi, {userInfo === null ? '' : userInfo}</p>
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
