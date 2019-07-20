import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Spinner = offsetSize => (
  <Row>
    <Col md={{ offset: offsetSize }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Col>
  </Row>
);
