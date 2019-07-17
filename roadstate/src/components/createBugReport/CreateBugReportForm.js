import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Modal, Button, Form, Col, Alert,
} from 'react-bootstrap';

export const MAX_BUG_REPORT_IMAGE_SIZE = 16 * 1024 * 1024;
export const MAX_BUG_REPORT_IMAGES_NUMBER = 5;

class CreateBugReportForm extends React.Component {
  state = {
    isFormValid: false, isImageValid: false, errorImageName: '', imageErrorType: '',
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ isFormValid: true });
    // ToDo: Send required objects
  };

  handleFileChanging = (event) => {
    if (event.target.files.length > 5) {
      this.setState({ imageErrorType: 'maxNumber' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    const errorImages = Array.from(event.target.files)
      .filter(image => image.size > MAX_BUG_REPORT_IMAGE_SIZE);
    if (errorImages.length > 0) {
      this.setState({
        errorImageName: errorImages[0].name,
        imageErrorType: 'maxSize',
      });
      event.target.value = null;
      this.handleImageAlertShow();
    }
    return true;
  };

  handleImageAlertDismiss = () => this.setState({ isImageValid: false });

  handleImageAlertShow = () => this.setState({ isImageValid: true });

  convertBytesToMB = a => Math.floor(a / 1048576);

  render() {
    const {
      isFormValid,
      isImageValid,
      errorImageName,
      imageErrorType,
    } = this.state;

    const errorImageMessages = {
      maxSize: `Maximum size of ${errorImageName} should not exceed ${this.convertBytesToMB(MAX_BUG_REPORT_IMAGE_SIZE)} MB.`,
      maxNumber: `The maximum number of photos you can upload is ${MAX_BUG_REPORT_IMAGES_NUMBER}.`,
    };

    const { isActive } = this.props;
    const alertText = errorImageMessages[imageErrorType];

    return (
      <Modal show={isActive} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bug Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={isFormValid}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Alert
              show={isImageValid}
              variant="danger"
              onClose={this.handleImageAlertDismiss}
              dismissible
            >
              <Alert.Heading>Image upload error!</Alert.Heading>
              {this.handleImageAlertText}
              {alertText}
            </Alert>
            <Form.Group>
              <Form.Control
                required
                type="number"
                min="0"
                max="10"
                placeholder="Problem level"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="text"
                as="textarea"
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                multiple
                type="file"
                name="imagePath"
                accept="image/*"
                onChange={this.handleFileChanging}
              />
            </Form.Group>
            <br />
            <Form.Row>
              <Col sm={{ offset: 2 }}>
                <Button type="submit" variant="primary" size="lg">
                  Save
                </Button>
              </Col>
              <Col sm={{ offset: 2 }}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={this.handleClose}
                >
                  Close
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

CreateBugReportForm.propTypes = {
  isActive: PropTypes.objectOf.isRequired,
  onClose: PropTypes.objectOf.isRequired,
};

export default CreateBugReportForm;
