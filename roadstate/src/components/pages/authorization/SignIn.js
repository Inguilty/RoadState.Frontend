import React from 'react';
import './authorization.css';
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
import { userActions } from './userActions';
import customStyles from './customStyles';

class SignIn extends React.Component {
  state = {
    isModalVisible: false,
  };

  schema = Yup.object().shape({
    username: Yup.string().required('Username is required!'),
    password: Yup.string().required('Password is required'),
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
    const { login } = this.props;
    if (e.username && e.password) {
      login(e.username, e.password);
    }
    this.closeModal();
  };

  render() {
    const { loggingIn } = this.props;
    const { isModalVisible } = this.state;
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
          <Modal isOpen={isModalVisible} onRequestClose={this.closeModal} style={customStyles}>
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
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = state => ({
  loggingIn: state.authorizationReducer.loggingIn,
});

const mapDispatchToProps = () => ({
  login: userActions.login,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
