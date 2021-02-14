import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const Post = ({ post }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ width: '80rem' }}>
      <Row>
        <Col md={3}>
          <Link to={`/post/${post.id}`}>
            <Card.Img
              src={post.uploaded_files[0].path}
              variant="top"
              style={{ width: '15rem' }}
            />
          </Link>
        </Col>
        <Col md={9}>
          <Card.Body>
            <Link to={`/post/${post.id}`}>
              <Card.Title as="div">
                <strong>{post.title}</strong>
              </Card.Title>
            </Link>

            <Card.Text as="h3">${post.product.price}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Post;
