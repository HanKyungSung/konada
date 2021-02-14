import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';
import Product from '../components/Product';
import LoginFeedback from '../components/LoginFeedback';

import { listProducts } from '../redux/actions/productActions';
import Post from '../components/Post';
import { fetchPosts } from '../redux/actions/postActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const postReducer = useSelector((state) => state.postReducer);
  const { loading, error, posts } = postReducer;

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { userInfo } = loggedinUserInfo;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
      {/* TODO: modal should pop up only when an user just entered their credential and redirected to this screeen. */}
      {userInfo ? <LoginFeedback /> : ''}

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
          {posts.map((post) => (
            <Post key={post.id} post={post} />
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
