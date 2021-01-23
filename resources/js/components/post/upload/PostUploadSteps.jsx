import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PostUploadSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>로그인</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>로그인</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="post/location">
            <Nav.Link>거래지역</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>거래지역</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="post/date">
            <Nav.Link>시간</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>시간</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="post/complete">
            <Nav.Link>완료</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>완료</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default PostUploadSteps;
