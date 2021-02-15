import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { SHOWED_MODAL } from '../redux/constants/userConstants';

const LoginFeedback = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { userInfo, showedModal } = loggedinUserInfo;

  const handleClose = () => {
    setShow(false);
    dispatch({ type: SHOWED_MODAL });
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (showedModal === false) {
      handleShow();
    }
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome back, {userInfo.username}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are successfully signed in!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginFeedback;
