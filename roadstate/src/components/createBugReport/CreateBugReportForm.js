import React from 'react';
import { Modal, Button, Form, Col, Alert } from 'react-bootstrap';

export const IMAGE_MAX_SIZE = 16777216; // Maximum size of the image is 16 MB
export const IMAGE_MAX_NUMBER = 5; // The maximum number on images that user can attach to the Bug report

class CreateBugReportForm extends React.Component {
  state = { isFormValid: false, isImageValid: false, errorImageName: '', imageErrorType: '' };

  handleClose = () => this.props.onClose();

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ isFormValid: true });
    //ToDo: Send required objects
  };

  handleFileChanging = event => {
    if(event.target.files.length > 5){
      this.setState({ imageErrorType: "maxNumber" });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    Array.from(event.target.files).forEach(image => {
      if (image.size > IMAGE_MAX_SIZE) {
        this.setState({ errorImageName: image.name,
                        imageErrorType: "maxSize" });
        event.target.value = null;
        this.handleImageAlertShow();
        return true;
      }
    });
  };

  handleImageAlertDismiss = () => this.setState({ isImageValid: false });

  handleImageAlertShow = () => this.setState({ isImageValid: true });

  convertBytesToMB = (a) => Math.floor(a/1048576);
  
  render() {
    let alertText = '';
    switch (this.state.imageErrorType) {
      case 'maxSize':
        alertText = 'Maximum image size should not exceed ' + this.convertBytesToMB(IMAGE_MAX_SIZE) + ' MB.';
        break;
      case 'maxNumber':
        alertText = 'The maximum number of photos you can upload is ' + IMAGE_MAX_NUMBER + '.';
        break;
      default:
        alertText = '';
    }

    return (
      <Modal show={this.props.isActive} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bug Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={this.state.isFormValid}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Alert
              show={this.state.isImageValid}
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
export default CreateBugReportForm;
