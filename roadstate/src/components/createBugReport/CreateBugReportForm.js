import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Modal, Button, Col, Alert, FormGroup, Row, FormControl,

} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import * as createBRactions from './actions';
import { Spinner } from '../Spinner';

export const MAX_BUG_REPORT_IMAGE_SIZE = 16 * 1024 * 1024;
export const MAX_BUG_REPORT_IMAGES_NUMBER = 5;

const convertBytesToMB = a => Math.floor(a / (1024 * 1024));

const errorImageMessages = {
  maxSize: `Maximum size of the image should not exceed ${convertBytesToMB(MAX_BUG_REPORT_IMAGE_SIZE)} MB.`,
  maxNumber: `The maximum number of photos you can upload is ${MAX_BUG_REPORT_IMAGES_NUMBER}.`,
  noImage: 'Please select the photos to upload.',
  wrongFileType: 'Please select photos only!',
};

class CreateBugReportForm extends React.Component {
  state = {
    isImageValid: false, isImageAlertShown: false, imageErrorType: '', photos: {},
  };

  initialState = {
    problemLevel: '',
    description: '',
  };

  schema = Yup.object().shape({
    problemLevel: Yup.number()
      .min(0, 'Problem level must be in between 0 and 10')
      .integer('Problem level must be an integer in between 0 and 10')
      .max(10, 'Problem level must be in between 0 and 10')
      .required('Description is required'),
    description: Yup.string()
      .min(5, 'Description is too small!')
      .required('Description is required'),
  });

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  handleSubmit = (e) => {
    const { isImageValid, photos } = this.state;
    const { problemLevel, description } = e;
    const { createBugReport, locationLongitude, locationLatitude } = this.props;

    if (isImageValid === true) {
      const photosData = new FormData();
      try {
        for (let i = 0; i < photos.length; i += 1) {
          const file = photos.item(i);
          photosData.append(`photos[${i}]`, file, file.name);
        }
      } catch {
        this.inputPhotos.value = null;
        this.setState({ imageErrorType: 'noImage', isImageValid: false });
        this.handleImageAlertShow();
      }
      createBugReport({
        problemLevel, description, photosData, locationLongitude, locationLatitude,
      });
    }
  };

  handleFileChanging = (event) => {
    if (event.target.files.length > MAX_BUG_REPORT_IMAGES_NUMBER) {
      this.setState({ imageErrorType: 'maxNumber' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    let errorImages = event.target.files;
    errorImages = [...errorImages].filter(image => image.size > MAX_BUG_REPORT_IMAGE_SIZE);
    if (errorImages.length > 0) {
      this.setState({ imageErrorType: 'maxSize' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    if (event.target.files.length <= 0) {
      this.setState({ imageErrorType: 'noImage', isImageValid: false });
      this.handleImageAlertShow();
      return true;
    }
    errorImages = event.target.files;
    errorImages = [...errorImages].filter(image => !image.name.match(/.(jpg|jpeg|png)$/i));
    if (errorImages.length > 0) {
      this.setState({ imageErrorType: 'wrongFileType' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    this.setState({ isImageValid: true, photos: event.target.files });
    return true;
  };

  handleImageAlertDismiss = () => this.setState({ isImageAlertShown: false });

  handleImageAlertShow = () => this.setState({ isImageValid: false, isImageAlertShown: true });

  render() {
    const {
      isImageAlertShown,
      imageErrorType,
    } = this.state;

    const {
      isActive,
      isLoading,
    } = this.props;
    const alertText = errorImageMessages[imageErrorType];

    return (
      <Formik
        initialValues={this.initialState}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched }) => (
          <Modal backdrop="static" keyboard="false" show={isActive} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>Create Bug Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                noValidate
              >
                <Alert
                  show={isImageAlertShown}
                  variant="danger"
                  onClose={this.handleImageAlertDismiss}
                  dismissible
                >
                  <Alert.Heading>Image upload error!</Alert.Heading>
                  {this.handleImageAlertText}
                  {alertText}
                </Alert>
                <FormGroup>
                  <Field
                    required
                    name="problemLevel"
                    type="number"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="Problem level"
                    className={
                      `form-control ${(errors.problemLevel && touched.problemLevel ? ' is-invalid' : '')}`
                    }
                  />
                  <ErrorMessage
                    name="problemLevel"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    required
                    name="description"
                    type="text"
                    as="textarea"
                    placeholder="Description"
                    className={
                      `form-control ${(errors.description && touched.description ? ' is-invalid' : '')}`
                    }
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControl
                    required
                    multiple
                    type="file"
                    accept="image/*"
                    ref={(inputPhotos) => { this.inputPhotos = inputPhotos; }}
                    className={
                      `form-control ${(errors.photos && touched.photos ? ' is-invalid' : '')}`
                    }
                    onChange={this.handleFileChanging}
                  />
                </FormGroup>
                <br />
                <Row>
                  <Col sm={{ offset: 2 }}>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      variant="primary"
                      size="lg"
                    >
                      {isLoading ? <Spinner /> : 'Save'}
                    </Button>
                  </Col>
                  <Col sm={{ offset: 2 }}>
                    <Button
                      disabled={isLoading}
                      variant="secondary"
                      size="lg"
                      onClick={this.handleClose}
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Formik>
    );
  }
}

CreateBugReportForm.propTypes = {
  locationLongitude: PropTypes.number.isRequired,
  locationLatitude: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.objectOf.isRequired,
  createBugReport: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.createBugReport.isLoading,
  isFailed: state.createBugReport.isFailed,
});

const mapDispatchToProps = {
  createBugReport: createBRactions.createBugReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBugReportForm);
