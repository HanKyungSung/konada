import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';

const PostingScreen = (history) => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location , setLocation] = useState('');
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userLogin.userInfo);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const { token, id } = userInfo;

        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity() === true)
        {
            const data = {
                user_id: id,
                title: title,
                price: price,
                description: description,
                item_name: itemName,
                location: location
            }

            dispatch(createProduct(data, token));
            history.history.push('/');
        }
        
        setValidated(true);
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="posting.controlTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title..."
                    />
                </Form.Group>
                <Form.Group controlId="posting.controlItemName">
                    <Form.Label>Name of Item</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Name of item..."
                    />
                </Form.Group>
                <Form.Group controlId="posting.price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price..."
                    />
                </Form.Group>
                <Form.Group controlId="posting.controlDescription">
                    <Form.Label>Description</Form.Label>
                    {/* <Form.Control as="textarea" rows={3} /> */}
                    <Form.Control
                        required
                        as="textarea" 
                        rows={3}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description..."
                    />
                </Form.Group>
                <Form.Group controlId="posting.controlLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location..."
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default PostingScreen;