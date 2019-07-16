import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Modal,
  Carousel,
  Card,
  Button,
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import {
  FaCheck,
  FaStar,
  FaComment,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import ModalDialog from 'react-bootstrap/ModalDialog';

const EmptyImage = () => (
  <Card>
    <Card.Img
      variant='top'
      src='https://scontent.fiev1-1.fna.fbcdn.net/v/t1.0-9/51760210_10155878999561389_7628714773646934016_o.jpg?_nc_cat=104&_nc_oc=AQnjSEe5kf53VvjoC-puvwwP7XsR6mDvPai2W5VoHhtyf12JtMgTaSeqNdEGf7iRXn8&_nc_ht=scontent.fiev1-1.fna&oh=5c3e1a8c2ef5521b95ce4e16e0fd9a79&oe=5DB35696'
      alt='No photos yet!'
    />
  </Card>
);

const PhotosCarousel = props => {
  return (
    <Carousel>
      {props.photos.map(photo => (
        <Carousel.Item>
          <Card>
            <Card.Img
              variant='top'
              src={photo}
              alt="Current photo hasn't downloaded yet!"
            />
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const Comments = props => {
  return (
    <>
      {props.comments.map(comment => (
        <Card key={comment.userName}>
          <Card.Header as={'h5'}>{comment.userName}</Card.Header>
          <Card.Body>
            <Card.Text>{comment.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                <Button variant='outline-success'>
                  <FaThumbsUp />
                </Button>
                {comment.likes}
              </Col>
              <Col>
                <Button variant='outline-danger'>
                  <FaThumbsDown />
                </Button>
                {comment.dislikes}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};
const EmptyComments = () => (
  <Card>
    <Card.Body>
      <Card.Title>No comments yet!</Card.Title>
    </Card.Body>
  </Card>
);

const BugReportView = ({ bugReport, handleChange, handleSubmit }) => {
  const [isModalOpened, setModalOpened] = useState(false);

  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);

  return (
    <div className='container-fluid'>
      <Button variant='primary' onClick={handleShow}>
        Bug report # {bugReport.id}
      </Button>
      <Modal show={isModalOpened} onHide={handleClose} centered={true}>
        <ModalDialog scrollable={true} centered={true}>
          <Modal.Header closeButton>
            {bugReport.photos !== undefined && bugReport.photos.length !== 0 ? (
              <PhotosCarousel photos={bugReport.photos} />
            ) : (
              <EmptyImage />
            )}
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Header as={'h6'}>Poll</Card.Header>
              <Card.Body>
                <Card.Text>Is this problem true?</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Container>
                  <Row>
                    <Col>
                      <Button variant='success'>Yes</Button>
                    </Col>
                    <Col>
                      <Button variant='danger'>No</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
            <br />
            <Container>
              <Row>
                <Col md={{ offset: 0, span: 5 }}>
                  <Card>
                    <Card.Header as='h6'>Description</Card.Header>
                    <Card.Body>
                      <Card.Text>{bugReport.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col />
                <Col md={{ offset: -1, span: 6 }}>
                  <Card>
                    <Card.Header as='h6'>Information</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={1}>
                          <FaCheck />
                        </Col>
                        <Col>Status: {bugReport.state}</Col>
                      </Row>
                      <Row>
                        <Col md={1}>
                          <FaStar />
                        </Col>
                        <Col>Rating: {bugReport.rating}</Col>
                      </Row>
                      <Row>
                        <Col md={1}>
                          <FaComment />
                        </Col>
                        <Col>
                          Comments:{' '}
                          {bugReport.comments === undefined
                            ? 0
                            : bugReport.comments.length}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <br />
              {bugReport.comments !== undefined &&
              bugReport.comments.length !== 0 ? (
                <Comments comments={bugReport.comments} />
              ) : (
                <EmptyComments />
              )}
            </Container>
            <br />
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='commentInput'>
                    <Form.Control
                      as='textarea'
                      rows={5}
                      placeholder='Enter your comment'
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button className='btn-primary' type='submit'>
                    Add comment
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
        </ModalDialog>
      </Modal>
    </div>
  );
};
BugReportView.propTypes = {
  bugReport: PropTypes.object.isRequired,
  isModalOpened: PropTypes.bool.isRequired
};

PhotosCarousel.propTypes = {
  photos: PropTypes.array.isRequired
};

export default BugReportView;
