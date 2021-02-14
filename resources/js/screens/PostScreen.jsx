import React, { Fragment }from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';

const PostScreen = ({ match }) => {
    const posts = useSelector((state) => state.postReducer.posts);
    const post = posts.find((post) => post.id == match.params.id);

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
        </Fragment>
    );
};

export default PostScreen;
