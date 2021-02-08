import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';

const ProfileScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLoginState = useSelector((state) => state.userLoginReducer);
  const { loading, error, userInfo } = userLoginState;
  /* TODO: when an user refreshes their web browser, all states are gone.
      what would be the best practice? localStorage?
  */

  useEffect(() => {
    if (userInfo === undefined) {
      history.push('/login');
    }
  }, [dispatch, match]);

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
            <p>Hi, {userInfo.name}</p>
          </Row>
          <Row>
            <Link to={`/user/profile/${userInfo.id}/edit`}>Edit profile</Link>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
