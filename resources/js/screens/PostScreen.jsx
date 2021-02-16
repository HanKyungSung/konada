import React, { Fragment, useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap';

const PostScreen = ({ match }) => {
    const [bid, setBid] = useState({
        content: '',
        price: '',
    })

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer.posts);
    const post = posts.find((post) => post.id == match.params.id);

    const bidReducer = useSelector((state) => state.loadBidsReducer);
    const { loading_bid, error_bid, bids } = bidReducer;

    useEffect(() => {}, []);

    const storeBidHandler = (e) => {
        e.preventDefault();
        dispatch(storeBid(bid));
    }

    return (
        <Fragment>
            <Link className="btn btn-dark my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={"/"+post.uploaded_files[0].path} alt={post.product.name} fluid />
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
            <Row>
                <Row>
                    <h3>Comment section</h3>
                    {bids.map(bid => (
                        <Bid key={bid.id} bid={bid} />
                    ))}
                </Row>
                <Row>
                    <Form onSubmit={storeBidHandler}>
                        <Form.Group controlId='content'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                value={bid.content}
                                onChange={(e) => setBid({ ...bid, content: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={bid.price}
                                onChange={(e) => setBid({ ...bid, price: e.target.value })}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="btn-dark">
                            Submit
                        </Button>
                    </Form>
                </Row>

            </Row>
        </Fragment>
    );
};

export default PostScreen;
