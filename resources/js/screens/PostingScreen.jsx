import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions/postActions';

const PostingScreen = (history) => {
	const [validated, setValidated] = useState(false);
	const [title, setTitle] = useState('');
	const [itemName, setItemName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [file, setFile] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userLoginReducer.userInfo);
	const postReducer = useSelector((state) => state.postReducer);
	const { loading, error } = postReducer;

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		const { token, id } = userInfo;

		event.preventDefault();
		event.stopPropagation();

		if (form.checkValidity() === true) {
			const data = {
				user_id: id,
				title: title,
				price: price,
				description: description,
				item_name: itemName,
				location: location,
				file: file
			};

			dispatch(createPost(data));
			setIsSubmitted(true);
		}

		setValidated(true);
	};

	useEffect(() => {
		if (isSubmitted && !loading && error === null) {
			history.history.push('/');
		}
	}, [loading]);

	return (
		<Container>
			<Modal
				show={loading}
				onHide={() => { }}
				centered
			>
				<Modal.Body style={{ textAlign: "center" }}>
					Processing. Please wait...
				</Modal.Body>
			</Modal>
			{error !== null &&
				<Alert variant={"danger"}>{error}</Alert>
			}
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
				<Form.Group>
					<Form.File onChange={(e) => setFile(e.target.files)} id="product_picture" label="Picture of the Product" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
        </Button>
			</Form>
		</Container>
	);
};

export default PostingScreen;
