import { useDispatch } from 'react-redux';
import { Row, Card, Button } from 'react-bootstrap';

import { destroyBid } from '../redux/actions/bidActions';

const Bid = ({ bid }) => {
  const dispatch = useDispatch();

  const deleteBid = (e) => {
    e.preventDefault();
    dispatch(destroyBid(bid.id));
  };

  return (
    <Row>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>User Id: {bid.user_id}</Card.Title>
          <Card.Text>Content: {bid.content}</Card.Text>
        </Card.Body>

        <Button onClick={deleteBid}>Delete</Button>
      </Card>
    </Row>
  );
};

export default Bid;
