import useEffect from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";

import Loader from "./../components/utilities/Loader";
import Message from "./../components/utilities/Message";

import { loadProfile } from "../actions/profileActions";

const ProfileScreen = ({ match }) => {
  const dispatch = useDispatch();

  const profileInfo = useSelector((state) => state.loadProfileReducer);
  const { loading, error, profile } = profileInfo;

  useEffect(() => {
    dispatch(loadProfile(match.params.userId));
  }, [dispatch, match]);
  // TODO: if no userId is given, load the active user's profile by default.

  return (
    <>
      <h1>Profile</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <p>{profile.username}</p>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
