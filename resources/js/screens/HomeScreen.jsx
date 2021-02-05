import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';
import Product from '../components/Product';

import { listProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducer);
  const { loading, error, products } = productList;

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { userInfo } = loggedinUserInfo;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container>
      {/* TODO: modal should pop up only when an user just entered their credential and redirected to this screeen. */}
      {userInfo ? (
        <>
          <Button variant="primary" onClick={handleShow}>
            Test a modal
          </Button>

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
      ) : (
        ''
      )}

      <Row>
        <Col>
          <h1>Latest Products</h1>
        </Col>
        <Col md={1}>
          <Button href="/posting" variant="success">
            Post
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Row>
      )}

      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  );
};

export default HomeScreen;
