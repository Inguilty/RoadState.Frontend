import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Modal, Button, Col, Alert, FormGroup, Row, FormControl, FormLabel,

} from 'react-bootstrap';
import {
  Formik, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import * as createBRactions from './actions';
import { Spinner } from '../Spinner';
import BugReportImageCarousel from './BugReportImageCarousel';

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
  initialState = {
    isImageValid: false, isImageAlertShown: false, imageErrorType: '', photos: [], problemState: 'Low',
  };

  state = this.initialState;

  initialState = {
    description: '',
  };

  schema = Yup.object().shape({
    description: Yup.string()
      .min(5, 'Description is too small!')
      .required('Description is required'),
  });

  componentWillReceiveProps = (nextProps) => {
    const { isLoading, isFailed } = this.props;
    if (nextProps.isLoading !== isLoading || nextProps.isFailed !== isFailed) {
      if (nextProps.isLoading === false && nextProps.isFailed === false) {
        this.setState(this.initialState);
        this.handleClose();
      }
    }
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  handleSubmit = (e) => {
    const { isImageValid, photos, problemState } = this.state;
    const { description } = e;
    const {
      createBugReport, locationLongitude, locationLatitude, userId,
    } = this.props;
    if (isImageValid === true && userId !== undefined && userId !== '') {
      if (userId !== undefined && userId !== '') {
        createBugReport({
          problemState,
          description,
          photos,
          longitude: locationLongitude,
          latitude: locationLatitude,
          userId,
        });
      } else {
        createBugReport({
          problemState,
          description,
          photos,
          longitude: locationLongitude,
          latitude: locationLatitude,
          userId: '8723258e-d2c9-4823-bb8d-9b532b24c5cc',
        });
      }
    } else {
      this.setState({ imageErrorType: 'noImage', isImageValid: false });
      this.handleImageAlertShow();
    }
  };

  handleProblemChange = (event) => {
    this.setState({ problemState: event.target.value });
  }

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
    this.setState({ isImageValid: true, photos: [...event.target.files] });
    return true;
  };

  handleImageAlertDismiss = () => this.setState({ isImageAlertShown: false });

  handleImageAlertShow = () => this.setState({ isImageValid: false, isImageAlertShown: true });

  render() {
    const {
      isImageAlertShown,
      imageErrorType,
      isImageValid,
      photos,
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
        {({
          values, handleChange, errors, touched,
        }) => (
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
                  <FormLabel>Current road state:</FormLabel>
                  <FormControl as="select" onChange={this.handleProblemChange}>
                    <option>Low</option>
                    <option>Middle</option>
                    <option>High</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    required
                    name="description"
                    type="text"
                    as="textarea"
                    placeholder="Description"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
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
                    onChange={this.handleFileChanging}
                  />
                </FormGroup>
                <FormGroup>
                  <BugReportImageCarousel
                    photos={isImageValid ? photos : []}
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
  isFailed: PropTypes.bool.isRequired,
  onClose: PropTypes.objectOf.isRequired,
  createBugReport: PropTypes.func.isRequired,
  userId: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.createBugReport.isLoading,
  isFailed: state.createBugReport.isFailed,
  userId: state.authorization.userId,
});

const mapDispatchToProps = {
  createBugReport: createBRactions.createBugReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBugReportForm);
