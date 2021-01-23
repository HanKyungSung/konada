import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const Post = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: '380px' }}>
      <Link to={`/post/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/post/${product._id}`}>
          <Card.Title as="h5">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">Location info</Card.Text>

        <Row>
          <Col>
            <Card.Text as="div">${product.price}</Card.Text>
          </Col>
          <Col xs={1}>❤️</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
