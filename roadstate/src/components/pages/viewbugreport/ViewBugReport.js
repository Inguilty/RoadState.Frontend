import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const RenderEmptyImage = () => (
  <Card>
    <Card.Img variant='top' src='...' alt='No photos yet!' />
  </Card>
);

const RenderPhotosCarousel = props => {
  debugger;
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

const ViewBugReport = props => {
  const { bugReport } = props;
  const [isModalOpened, setModalOpened] = useState(false);

  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);

  return (
    <div className='container-fluid'>
      <Button variant='primary' onClick={handleShow}>
        Bug report # {bugReport.id}
      </Button>
      <Modal show={isModalOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          {bugReport.photos == void 0 ? (
            <RenderEmptyImage />
          ) : (
            <RenderPhotosCarousel photos={bugReport.photos} />
          )}
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Description: {bugReport.description}</Modal.Title>
          <Modal.Title>State: {bugReport.state}</Modal.Title>
          <Modal.Title>Rating: {bugReport.rating}</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
ViewBugReport.propTypes = {
  bugReport: PropTypes.object.isRequired,
  isModalOpened: PropTypes.bool.isRequired
};

RenderPhotosCarousel.propTypes = {
  photos: PropTypes.array.isRequired
};

export default ViewBugReport;
