import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ width: '80rem' }}>
      <Row>
        <Col md={3}>
          <Link to={`/product/${product._id}`}>
            <Card.Img
              src={product.image}
              variant="top"
              style={{ width: '15rem' }}
            />
          </Link>
        </Col>
        <Col md={9}>
          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as="h3">${product.price}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Product;
