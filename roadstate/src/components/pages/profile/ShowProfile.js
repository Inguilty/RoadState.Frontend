import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  FormControl, FormGroup, FormLabel, Image, Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import * as updateUser from './actions';
import '../../../authorization.css';

export const IMAGE_MAX_SIZE = 16 * 1024 * 1024;
export const convertBytesToMB = a => Math.floor(a / (1024 * 1024));
export const errorMessages = {
  maxSize: `Maximum size of the image should not exceed ${convertBytesToMB(IMAGE_MAX_SIZE)} MB.`,
};

class ShowProfile extends React.Component {
  state = {
    image: '',
    imagePreviewUrl: '',
    isImageValid: false,
    imageErrorType: '',
  };

  schema = Yup.object().shape({
    avatar: Yup.string(),
    username: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        'You must enter at least 1 number, 1 upper and lowercase letter.',
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  closeModal = () => {
    const { history } = this.props;
    history.goBack();
  };

  resetUserUpdated = () => {
    const { history, updated, completeUpdating } = this.props;
    if (updated) {
      completeUpdating();
      history.push('/');
    }
  };

  handleAlertDismiss = () => {
    const { removeError } = this.props;
    removeError();
  };

  handleSubmit = (e) => {
    const { image, imagePreviewUrl } = this.state;
    const { update, userId, token } = this.props;
    const updatedUser = {
      avatar: image,
      avatarUrl: imagePreviewUrl,
      password: e.newPassword,
    };
    if ((updatedUser.password && e.newPassword && e.confirmNewPassword) || image) {
      update(userId, updatedUser.avatarUrl, e.password, e.confirmNewPassword, token);
    }
  };

  handleFileChanging = (e) => {
    if (e.target.files[0] === undefined) {
      return;
    }
    if (e.target.files[0].size > IMAGE_MAX_SIZE) {
      this.setState({
        imageErrorType: 'maxSize',
      });
      this.handleImageAlertShow();
      e.target.value = null;
      return;
    }
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleImageAlertDismiss = () => this.setState({ isImageValid: false });

  handleImageAlertShow = () => this.setState({ isImageValid: true });

  render() {
    const { isImageValid, imageErrorType, imagePreviewUrl } = this.state;
    const {
      userId, isUpdating, updated, errorMessage,
    } = this.props;
    const imageAlertText = errorMessages[imageErrorType];
    const userImage = imagePreviewUrl && <Image id="userAvatar" src={imagePreviewUrl} />;
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          newPassword: '',
          confirmNewPassword: '',
          avatar: '',
        }}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Modal
            className="Modal"
            isOpen={isUpdating || !updated}
            onAfterClose={this.resetUserUpdated}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <FormGroup className="Form-wrapper">
              <Form onSubmit={handleSubmit}>
                <Alert
                  show={errorMessage}
                  variant="danger"
                  onClose={this.handleAlertDismiss}
                  dismissible
                >
                  {errorMessage}
                </Alert>
                <Alert
                  show={isImageValid}
                  variant="danger"
                  onClose={this.handleImageAlertDismiss}
                  dismissible
                >
                  <Alert.Heading>Image upload error!</Alert.Heading>
                  {imageAlertText}
                </Alert>
                <center>
                  <div>{userImage}</div>
                </center>
                <span>Do you want to change your avatar?</span>
                <FormGroup className="input-group">
                  <FormGroup className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      Avatar
                    </span>
                  </FormGroup>
                  <FormGroup className="custom-file">
                    <FormControl
                      type="file"
                      name="imagePath"
                      accept="image/*"
                      onChange={this.handleFileChanging}
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />

                    <FormLabel className="custom-file-label" htmlFor="inputGroupFile01">
                      Choose file
                    </FormLabel>
                  </FormGroup>
                </FormGroup>

                <FormGroup className="Form-group">
                  <FormControl name="username" type="text" placeholder={userId} readOnly />
                </FormGroup>
                <FormGroup className="Form-group">
                  <FormControl name="email" type="text" readOnly />
                </FormGroup>
                <FormGroup className="form-group">
                  <span>Do you want to change password?</span>
                </FormGroup>
                <FormGroup className="Form-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Old password"
                    className={`form-control${
                      errors.password && touched.password ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    className={`form-control${
                      errors.newPassword && touched.newPassword ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                </FormGroup>
                <FormGroup className="form-group">
                  <Field
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className={`form-control${
                      errors.confirmNewPassword && touched.confirmNewPassword ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup className="Form-group">
                  <span>Do you want to change your e-mail? Click </span>
                  <NavLink href="#">here</NavLink>
                </FormGroup>
                <FormControl type="submit" className="btn btn-primary btn-block" value="Update" />
                {isUpdating && (
                  <center>
                    <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin" />
                  </center>
                )}
              </Form>
            </FormGroup>
          </Modal>
        )}
      </Formik>
    );
  }
}

ShowProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  completeUpdating: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  removeError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userId: state.authorization.userId,
  isUpdating: state.updateUser.isUpdating,
  updated: state.updateUser.updated,
  token: state.authorization.token,
  errorMessage: state.updateUser.errorMessage,
});

export default connect(
  mapStateToProps,
  {
    update: updateUser.update,
    completeUpdating: updateUser.completeUpdating,
    removeError: updateUser.removeError,
  },
)(ShowProfile);
