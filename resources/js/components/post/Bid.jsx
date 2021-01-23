import React, { useState, useEffect } from 'react';

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
const Bid = ({ product }) => {
  const [text, setText] = useState('');

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item as={Row}>
          <Col sm={5}>
            <Form.Control type="number" placeholder="Normal text" />
          </Col>
          <Col sm={5}>
            <Button type="button" disabled={product.isAvailable === false}>
              Make Offer
            </Button>
          </Col>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Bid;
