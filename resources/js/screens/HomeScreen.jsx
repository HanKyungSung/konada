import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { listProducts } from './../actions/productActions';
import Loader from './../components/utilities/Loader';
import Message from './../components/utilities/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col><h1>Latest Products</h1></Col>
        <Col md={1}><Button href="/posting" variant="success">Post</Button></Col>
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
    </Container>
  );
};

export default HomeScreen;
