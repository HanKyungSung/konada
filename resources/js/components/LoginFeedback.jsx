import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { saveState, loadState } from '../localStorage';

const LoginFeedback = () => {
  const [show, setShow] = useState(false);

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { userInfo } = loggedinUserInfo;

  const displayModal = loadState('displayModal');

  const handleClose = () => {
    setShow(false);
    saveState('displayModal', true);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (displayModal !== true) {
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
