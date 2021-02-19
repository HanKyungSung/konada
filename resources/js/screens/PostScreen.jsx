import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from 'react-bootstrap';

import Loader from '../components/utilities/Loader';
import Message from '../components/utilities/Message';
import Bid from '../components/Bid';

import { loadBids, storeBid } from '../redux/actions/bidActions';

const PostScreen = ({ match }) => {
  const [bid, setBid] = useState({
    content: '',
    price: '',
  });

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer.posts);
  const post = posts.find((post) => post.id == match.params.id);

  const bidReducer = useSelector((state) => state.loadBidsReducer);
  const { loading_bid, error_bid, bids } = bidReducer;

  useEffect(() => {
    dispatch(loadBids());
  }, [dispatch]);

  const storeBidHandler = (e) => {
    e.preventDefault();
    // TODO: if user is not signed in, shouldn't dispatch
    dispatch(storeBid(bid));
  };

  return (
    <Container>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={'/' + post.uploaded_files[0].path}
            alt={post.product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{post.product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${post.product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {post.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${post.product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.isAvailable ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
              </ListGroup.Item> */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <h3>Comment section</h3>
      <Row>
        <Form onSubmit={storeBidHandler}>
          <Row>
            <Col>
              <Form.Group controlId="content">
                <Form.Control
                  value={bid.content}
                  onChange={(e) => setBid({ ...bid, content: e.target.value })}
                  placeholder="Bid"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Control
                  value={bid.price}
                  onChange={(e) => setBid({ ...bid, price: e.target.value })}
                  placeholder="price"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" variant="primary" className="btn-dark">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row>
        {loading_bid ? (
          <Loader />
        ) : error_bid ? (
          <Message variant="danger">{error_login}</Message>
        ) : (
          <Row>
            {bids.map((bid) => (
              <Bid key={bid.id} bid={bid} />
            ))}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default PostScreen;
