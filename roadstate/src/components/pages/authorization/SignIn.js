import React from 'react';
import '../authorization/authorization.css';
import Modal from 'react-modal';
import customStyles from '../authorization/customStyles';
import { withRouter, NavLink } from 'react-router-dom';
import { Form, FormControl, FormGroup } from 'react-bootstrap';

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

  render() {
    return (
      <Modal
        isOpen={this.state.isModalVisible}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2>Sign in</h2>
        <FormGroup className='Form-wrapper'>
          <Form action='/examples/actions/confirmation.php' method='post'>
            <p className='hint-text'>Sign in with your google account</p>
            <FormGroup>
              <NavLink href='#' classNameName='btn scl-md'>
                <center>
                  <i className='icon' />
                </center>
              </NavLink>
            </FormGroup>
            <FormGroup className='or-seperator'>
              <b>or</b>
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                type='text'
                className='Form-control'
                placeholder='Username'
                required='required'
              />
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                type='password'
                className='Form-control'
                placeholder='Password'
                required='required'
              />
            </FormGroup>
            <FormControl
              type='submit'
              classNameName='btn btn-primary btn-block'
              value='Sign up'
            />
            <FormGroup className='Form-footer'>
              <NavLink href='#'>Forgot Your password?</NavLink>
            </FormGroup>
          </Form>
        </FormGroup>
      </Modal>
    );
  }
}

export default withRouter(SignInPage);
