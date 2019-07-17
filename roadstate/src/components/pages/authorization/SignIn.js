import React from 'react';
import '../authorization/authorization.css';
import Modal from 'react-modal';
import customStyles from '../authorization/customStyles';
import { NavLink } from 'react-router-dom';
import { FormControl, FormGroup } from 'react-bootstrap';
import { userActions } from '../../../store/actions';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialState = {
  username: '',
  password: ''
};

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required')
});

class SignInPage extends React.Component {
  state = {
    isModalVisible: false
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
    e.preventDefault();

    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  };

  render() {
    const { loggingIn } = this.props;
    return (
      <Formik
        initialValues={initialState}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          const { dispatch } = this.props;
          if (values.username && values.password) {
            dispatch(userActions.login(values.username, values.password));
          }
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Modal
            isOpen={this.state.isModalVisible}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <h2>Sign in</h2>
            <FormGroup className='Form-wrapper'>
              <Form onSubmit={handleSubmit}>
                <p className='hint-text'>Sign in with your google account</p>
                <FormGroup>
                  <center>
                    <NavLink href='#' className='btn scl-md'>
                      <i class='icon' />
                    </NavLink>
                  </center>
                </FormGroup>
                <FormGroup className='or-seperator'>
                  <b>or</b>
                </FormGroup>

                <FormGroup className='form-group'>
                  <Field
                    name='username'
                    type='text'
                    style={{ width: 365 }}
                    placeholder='Username'
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
                    name='password'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='Password'
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

                <FormControl
                  type='submit'
                  className='btn btn-primary btn-block'
                  value='Sign in'
                />
                {loggingIn && (
                  <center>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className='fa fa-spinner fa-spin'
                    />
                  </center>
                )}
                <FormGroup className='Form-footer'>
                  <NavLink href='#'>Forgot Your password?</NavLink> Have no
                  account? <NavLink to='/signUp'>Sign up</NavLink>
                </FormGroup>
              </Form>
            </FormGroup>
          </Modal>
        )}
      </Formik>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default connect(mapStateToProps)(SignInPage);
