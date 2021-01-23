import React from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
  Container,
} from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <>
      <Container>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Image src={product.image} alt={product.name} fluid />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>{product.price}</p>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div>{product.description}</div>
          </ListGroup.Item>
        </ListGroup>
       
        {/* TODO: render products in same category */}
      </Container>
    </>
  );
};

export default Product;
