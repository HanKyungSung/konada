import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';
import LoginFeedback from '../components/LoginFeedback';
import Post from '../components/Post';

import { fetchPosts } from '../redux/actions/postActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const postReducer = useSelector((state) => state.postReducer);
  const { loading, error, posts } = postReducer;

  const loggedinUserInfo = useSelector((state) => state.userLoginReducer);
  const { loading_login, error_login, userInfo } = loggedinUserInfo;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
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
      {loading_login ? (
        <Loader />
      ) : error_login ? (
        <Message variant="danger">{error_login}</Message>
      ) : (
        <Row>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
