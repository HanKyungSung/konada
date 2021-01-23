import React from 'react';
import { Link } from 'react-router-dom';
import products from '../../product';
import Product from './Product';
import Bid from '../post/Bid';
import { Row } from 'react-bootstrap';

const PostScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);
  console.log('product', product);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Product product={product} />
      <br />
      <Bid product={product} />
    </>
  );
};

export default PostScreen;
