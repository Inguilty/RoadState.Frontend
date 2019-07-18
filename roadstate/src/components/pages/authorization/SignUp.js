import React from 'react';
import '../authorization/authorization.css';
import Modal from 'react-modal';
import customStyles from '../authorization/customStyles';
import { NavLink } from 'react-router-dom';
import {
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Image
} from 'react-bootstrap';
import { userActions } from './actions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class SignUp extends React.Component {
  IMAGE_MAX_SIZE = () => 16777215;

  handleFileChanging = e => {
    if (e.target.files[0] === undefined) {
      return;
    }
    if (e.target.files[0].size > this.IMAGE_MAX_SIZE) {
      e.target.value = null;
      return;
    }
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  state = {
    isModalVisible: false,
    image: '',
    imagePreviewUrl: ''
  };

  componentDidMount() {
    this.openModal();
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
    this.props.history.goBack();
  };

  handleSubmit = e => {
    const user = {
      avatar: this.state.image,
      avatarUrl: this.state.imagePreviewUrl,
      username: e.username,
      email: e.email,
      password: e.password
    };
    const { dispatch } = this.props;
    if (user.username && user.email && user.password && e.acceptedTerms) {
      dispatch(userActions.register(user));
    }
    this.closeModal();
  };

  initialState = {
    username: '',
    email: '',
    password: '',
    confirmPasword: '',
    acceptedTerms: false
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
        'You must enter at least 1 number, 1 upper and lowercase letter.'
      ),
    confirmPasword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    acceptedTerms: Yup.bool()
  });

  render() {
    const { registering } = this.props;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <Image id='userAvatar' src={imagePreviewUrl} />;
    }
    return (
      <Formik
        initialValues={this.initialState}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Modal
            isOpen={this.state.isModalVisible}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <h2>Sign up</h2>
            <FormGroup className='Form-wrapper'>
              <center>
                <div>{$imagePreview}</div>
              </center>
              <p className='hint-text'>
                * - Fill in this Form to create your account!
              </p>
              <Form onSubmit={handleSubmit}>
                <FormGroup className='input-group'>
                  <FormGroup className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      Avatar
                    </span>
                  </FormGroup>
                  <FormGroup className='custom-file'>
                    <FormControl
                      type='file'
                      name='imagePath'
                      accept='image/*'
                      onChange={this.handleFileChanging}
                      className='custom-file-input'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                    />

                    <FormLabel
                      className='custom-file-label'
                      htmlFor='inputGroupFile01'
                    >
                      Choose file
                    </FormLabel>
                  </FormGroup>
                </FormGroup>

                <FormGroup className='form-group'>
                  <Field
                    name='username'
                    type='text'
                    style={{ width: 365 }}
                    placeholder='Username*'
                    className={
                      'form-control' +
                      (errors.username && touched.username ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='invalid-feedback'
                  />
                </FormGroup>

                <FormGroup className='form-group'>
                  <Field
                    name='email'
                    type='email'
                    placeholder='Email*'
                    className={
                      'form-control' +
                      (errors.email && touched.email ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='invalid-feedback'
                  />
                </FormGroup>

                <FormGroup className='form-group'>
                  <Field
                    name='password'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='Password*'
                    className={
                      'form-control' +
                      (errors.password && touched.password ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='invalid-feedback'
                  />
                </FormGroup>

                <FormGroup className='form-group'>
                  <Field
                    name='confirmPasword'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='Confirm password*'
                    className={
                      'form-control' +
                      (errors.confirmPasword && touched.confirmPasword
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name='confirmPasword'
                    component='div'
                    className='invalid-feedback'
                  />
                </FormGroup>

                <Row className='form-group'>
                  <Col sm='1'>
                    <Field
                      name='acceptedTerms'
                      type='checkbox'
                      className={
                        'form-checkbox' +
                        (errors.acceptedTerms && touched.acceptedTerms
                          ? ' is-invalid'
                          : '')
                      }
                    />
                  </Col>
                  <Col>
                    <FormLabel className='checkbox-inline'>
                      {' '}
                      I accept the{' '}
                      <NavLink href='#'>Terms &amp; Conditions</NavLink>
                    </FormLabel>
                  </Col>
                  <ErrorMessage
                    name='acceptedTerms'
                    component='div'
                    className='invalid-feedback'
                  />
                </Row>

                <FormControl
                  type='submit'
                  className='btn btn-primary btn-block'
                  value='Sign up'
                />
                {registering && (
                  <center>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className='fa fa-spinner fa-spin'
                    />
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

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

export default connect(mapStateToProps)(SignUp);
