import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './authorization.css';
import {
  FormControl, FormGroup, FormLabel, Image, Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { userActions } from './userActions';
import customStyles from './customStyles';

export const IMAGE_MAX_SIZE = 16 * 1024 * 1024;
export const convertBytesToMB = a => Math.floor(a / (1024 * 1024));
export const errorMessages = {
  maxSize: `Maximum size of the image should not exceed ${convertBytesToMB(IMAGE_MAX_SIZE)} MB.`,
};

class ShowProfile extends React.Component {
  state = {
    isModalVisible: false,
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

  componentDidMount() {
    this.openModal();
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    const { history } = this.props;
    this.setState({ isModalVisible: false });
    history.goBack();
  };

  handleSubmit = (e) => {
    const { update, user } = this.props;
    const updatedUser = {
      ...user,
      avatar: e.avatar,
      avatarUrl: e.avatarUrl,
      password: e.newPassword,
    };
    if (e.password && e.newPassword && e.confirmNewPassword) {
      update(updatedUser);
    }
    this.closeModal();
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
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleImageAlertDismiss = () => this.setState({ isImageValid: false });

  handleImageAlertShow = () => this.setState({ isImageValid: true });

  render() {
    debugger;
    const {
      isModalVisible, isImageValid, imageErrorType, imagePreviewUrl,
    } = this.state;
    const imageAlertText = errorMessages[imageErrorType];
    const { user } = this.props;

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
            isOpen={isModalVisible}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <FormGroup className="Form-wrapper">
              <Form onSubmit={handleSubmit}>
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
                  <FormControl
                    name="username"
                    type="text"
                    // placeholder={user.username}
                    readOnly
                  />
                </FormGroup>
                <FormGroup className="Form-group">
                  <FormControl
                    name="email"
                    type="text"
                    // placeholder={user.email}
                    readOnly
                  />
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
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    className={`form-control${
                      errors.newPassword && touched.newPassword ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </FormGroup>
                <FormGroup className="form-group">
                  <Field
                    name="confirmNewPasword"
                    type="password"
                    placeholder="Confirm new password"
                    className={`form-control${
                      errors.confirmPasword && touched.confirmPasword ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPasword"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup className="Form-group">
                  <span>Do you want to change your e-mail? Click </span>
                  <NavLink href="#">here</NavLink>
                </FormGroup>
                <FormControl type="submit" className="btn btn-primary btn-block" value="Update" />
              </Form>
            </FormGroup>
          </Modal>
        )}
      </Formik>
    );
  }
}

ShowProfile.propTypes = {
  user: PropTypes.objectOf.isRequired,
  update: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authorizationReducer.user,
});

const mapDispatchToProps = {
  update: userActions.update,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowProfile);
