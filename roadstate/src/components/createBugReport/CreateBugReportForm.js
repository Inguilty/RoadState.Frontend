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
    isImageValid: false, isImageAlert: false, imageErrorType: '', photos: {},
  };

  initialState = {
    probLvl: '',
    desc: '',
  };

  schema = Yup.object().shape({
    probLvl: Yup.number()
      .min(0, 'Problem level must be in between 0 and 10')
      .integer('Problem level must be an integer in between 0 and 10')
      .max(10, 'Problem level must be in between 0 and 10')
      .required('Description is required'),
    desc: Yup.string()
      .min(5, 'Description is too small!')
      .required('Description is required'),
    /* .(MAX_BUG_REPORT_IMAGES_NUMBER, 'Maximum 5 photos are allowed!')
    .maxSize(MAX_BUG_REPORT_IMAGE_SIZE, `The maximum number of photos you can upload
    is ${MAX_BUG_REPORT_IMAGES_NUMBER}.`) */
  });

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (prevProps.isLoading !== isLoading) {
      if (isLoading) {
        this.btnSub.setAttribute('disabled', 'disabled');
        this.btnClose.setAttribute('disabled', 'disabled');
      } else {
        this.btnSub.removeAttribute('disabled');
        this.btnClose.removeAttribute('disabled');
      }
    }
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  handleSubmit = (e) => {
    const { isImageValid, photos } = this.state;
    const { probLvl, desc } = e;
    const { createBugReport, locLong, locLat } = this.props;

    if (isImageValid === true) {
      createBugReport({
        probLvl, desc, photos, locLong, locLat,
      });
      // ToDo: Send required objects
    }
  };

  handleFileChanging = (event) => {
    if (event.target.files.length > MAX_BUG_REPORT_IMAGES_NUMBER) {
      this.setState({ imageErrorType: 'maxNumber' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    let errorImages = Array.from(event.target.files)
      .filter(image => image.size > MAX_BUG_REPORT_IMAGE_SIZE);
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
    errorImages = Array.from(event.target.files)
      .filter(image => !image.name.match(/.(jpg|jpeg|png)$/i));
    if (errorImages.length > 0) {
      this.setState({ imageErrorType: 'wrongFileType' });
      event.target.value = null;
      this.handleImageAlertShow();
      return true;
    }
    this.setState({ isImageValid: true, photos: event.target.files });
    return true;
  };

  handleImageAlertDismiss = () => this.setState({ isImageAlert: false });

  handleImageAlertShow = () => this.setState({ isImageValid: false, isImageAlert: true });

  render() {
    const {
      isImageAlert,
      imageErrorType,
    } = this.state;

    const { isActive } = this.props;
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
                // onSubmit={e => handleSubmit(e)}
              >
                <Alert
                  show={isImageAlert}
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
                    name="probLvl"
                    type="number"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="Problem level"
                    className={
                      `form-control ${(errors.probLvl && touched.probLvl ? ' is-invalid' : '')}`
                    }
                  />
                  <ErrorMessage
                    name="probLvl"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    required
                    name="desc"
                    type="text"
                    as="textarea"
                    placeholder="Description"
                    className={
                      `form-control ${(errors.desc && touched.desc ? ' is-invalid' : '')}`
                    }
                  />
                  <ErrorMessage
                    name="desc"
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
                      ref={(btnSub) => { this.btnSub = btnSub; }}
                      type="submit"
                      variant="primary"
                      size="lg"
                    >
                      Save
                    </Button>
                  </Col>
                  <Col sm={{ offset: 2 }}>
                    <Button
                      ref={(btnClose) => { this.btnClose = btnClose; }}
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
  locLong: PropTypes.number.isRequired,
  locLat: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.objectOf.isRequired,
  createBugReport: PropTypes.func.isRequired,
  /* locLog: PropTypes.objectOf.isRequired,
  locLat: PropTypes.objectOf.isRequired, */
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
