import React from 'react';
import '../authorization/authorization.css';
import Modal from 'react-modal';
import customStyles from '../authorization/customStyles';
import { NavLink } from 'react-router-dom';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import { userActions } from '../../../store/actions';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());
  }
  state = {
    isModalVisible: false,
    username: '',
    password: '',
    submitted: false
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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <Modal
        isOpen={this.state.isModalVisible}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2>Sign in</h2>
        <FormGroup className='Form-wrapper'>
          <Form name='form' onSubmit={this.handleSubmit} method='post'>
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
            <FormGroup
              className={
                'Form-group' + (submitted && !username ? ' has-error' : '')
              }
            >
              <FormControl
                type='text'
                className='Form-control'
                placeholder='Username'
                required='required'
                name='username'
                value={username}
                onChange={this.handleChange}
              />
              {submitted && !username && (
                <div className='help-block'>Username is required</div>
              )}
            </FormGroup>
            <FormGroup
              className={
                'Form-group' + (submitted && !password ? ' has-error' : '')
              }
            >
              <FormControl
                type='password'
                className='Form-control'
                placeholder='Password'
                required='required'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className='help-block'>Password is required</div>
              )}
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
              <NavLink href='#'>Forgot Your password?</NavLink> Have no account?{' '}
              <NavLink to='/signUp'>Sign up</NavLink>
            </FormGroup>
          </Form>
        </FormGroup>
      </Modal>
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
