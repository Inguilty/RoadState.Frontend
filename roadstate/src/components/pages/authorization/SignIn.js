import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import * as userActions from './actions';
import '../../../authorization.css';

class SignIn extends React.Component {
  schema = Yup.object().shape({
    username: Yup.string().required('Username is required!'),
    password: Yup.string().required('Password is required'),
  });

  closeModal = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSubmit = (e) => {
    const { login } = this.props;
    if (e.username && e.password) {
      login(e.username, e.password);
    }
  };

  render() {
    const { loggingIn, loggedIn } = this.props;
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Modal className="Modal" isOpen={loggingIn || !loggedIn} onRequestClose={this.closeModal}>
            <h2>Sign in</h2>
            <FormGroup className="Form-wrapper">
              <Form onSubmit={handleSubmit}>
                <p className="hint-text">Sign in with your google account</p>
                <FormGroup>
                  <center>
                    <NavLink href="#" className="btn scl-md">
                      <i className="icon" />
                    </NavLink>
                  </center>
                </FormGroup>
                <FormGroup className="or-seperator">
                  <b>or</b>
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className={`form-control${
                      errors.username && touched.username ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormGroup className="form-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </FormGroup>

                <FormControl type="submit" className="btn btn-primary btn-block" value="Sign in" />
                {loggingIn && (
                  <center>
                    <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin" />
                  </center>
                )}
                <FormGroup className="Form-footer">
                  <NavLink href="#">Forgot Your password?</NavLink>
                  {' '}
Have no account?
                  {' '}
                  <NavLink to="/signUp">Sign up</NavLink>
                </FormGroup>
              </Form>
            </FormGroup>
          </Modal>
        )}
      </Formik>
    );
  }
}

SignIn.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = state => ({
  loggingIn: state.authorization.loggingIn,
  loggedIn: state.authorization.loggedIn,
});

export default connect(
  mapStateToProps,
  { login: userActions.login },
)(SignIn);
