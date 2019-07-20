import React from 'react';
import './authorization.css';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  FormControl, FormGroup, FormLabel, Row, Col, Image, Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { IMAGE_MAX_SIZE, errorMessages } from './ShowProfile';
import { userActions } from './userActions';
import customStyles from './customStyles';

class SignUp extends React.Component {
  state = {
    isModalVisible: false,
    image: '',
    imagePreviewUrl: '',
    isImageValid: false,
    imageErrorType: '',
  };

  schema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required!')
      .min(6, 'Username must be at least 6 characters'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        'You must enter at least 1 number, 1 upper and lowercase letter.',
      ),
    confirmPasword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    acceptedTerms: Yup.bool(),
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
    const { image, imagePreviewUrl } = this.state;
    const user = {
      avatar: image,
      avatarUrl: imagePreviewUrl,
      username: e.username,
      email: e.email,
      password: e.password,
    };
    const { register } = this.props;
    if (user.username && user.email && user.password && e.acceptedTerms) {
      register(user);
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
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleImageAlertDismiss = () => this.setState({ isImageValid: false });

  handleImageAlertShow = () => this.setState({ isImageValid: true });

  render() {
    const { isRegistering } = this.props;
    const {
      isModalVisible, isImageValid, imageErrorType, imagePreviewUrl,
    } = this.state;
    const imageAlertText = errorMessages[imageErrorType];

    const userImage = imagePreviewUrl && <Image id="userAvatar" src={imagePreviewUrl} />;
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPasword: '',
          acceptedTerms: false,
        }}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Modal isOpen={isModalVisible} onRequestClose={this.closeModal} style={customStyles}>
            <h2>Sign up</h2>
            <FormGroup className="Form-wrapper">
              <center>
                <div>{userImage}</div>
              </center>
              <p className="hint-text">* - Fill in this Form to create your account!</p>
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

                <FormGroup className="form-group">
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username*"
                    className={`form-control${
                      errors.username && touched.username ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email*"
                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password*"
                    className={`form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="confirmPasword"
                    type="password"
                    placeholder="Confirm password*"
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

                <Row className="form-group">
                  <Col sm="1">
                    <Field
                      name="acceptedTerms"
                      type="checkbox"
                      className={`form-checkbox${
                        errors.acceptedTerms && touched.acceptedTerms ? ' is-invalid' : ''
                      }`}
                    />
                  </Col>
                  <Col>
                    <FormLabel className="checkbox-inline">
                      {' '}
                      I accept the
                      {' '}
                      <NavLink href="#">Terms &amp; Conditions</NavLink>
                    </FormLabel>
                  </Col>
                  <ErrorMessage name="acceptedTerms" component="div" className="invalid-feedback" />
                </Row>

                <FormControl type="submit" className="btn btn-primary btn-block" value="Sign up" />
                {isRegistering && (
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

SignUp.propTypes = {
  isRegistering: PropTypes.bool.isRequired,
  register: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = state => ({ isRegistering: state.registerReducer });

const mapDispatchToProps = {
  register: userActions.register,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
