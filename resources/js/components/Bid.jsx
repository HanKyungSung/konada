import { useSelector } from 'react-redux';
import { Row, Card, Button } from 'react-bootstrap';

const Bid = ({ bid }) => {
  return (
    <Row>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>User Id: {bid.user_id}</Card.Title>
          <Card.Text>Content: {bid.content}</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Bid;
