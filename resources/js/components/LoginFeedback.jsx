import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

const LoginFeedback = () => {
  const [show, setShow] = useState(false);

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { userInfo } = loggedinUserInfo;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
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
