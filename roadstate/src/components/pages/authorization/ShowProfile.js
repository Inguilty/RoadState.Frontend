import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import '../authorization/authorization.css';
import customStyles from '../authorization/customStyles';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ShowProfile extends React.Component {
  state = {
    isModalVisible: false
  };
  componentDidMount() {
    this.getProfile();
    this.openModal();
  }
  updateProfile() {}

  getProfile() {}

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
        <FormGroup className='Form-wrapper'>
          <Form action='#' method='post'>
            <center>
              <i id='userAvatar' />
            </center>
            <span>Do you want to change your avatar?</span>
            <FormGroup className='input-group'>
              <FormGroup className='input-group-prepend'>
                <span className='input-group-text' id='inputGroupFileAddon01'>
                  Avatar
                </span>
              </FormGroup>
              <FormGroup className='custom-file'>
                <input
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

            <FormGroup className='Form-group'>
              <FormControl
                name='UserName'
                type='text'
                maxlength='30'
                style={{ width: 365 }}
                placeholder='Username'
                readOnly
              />
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                name='FromEmailAddress'
                type='email'
                maxlength='60'
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+/.[a-z]{2,}$'
                style={{ width: 365 }}
                placeholder='Email'
                readOnly
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <span>Do you want to change password?</span>
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                name='oldPassword'
                type='password'
                maxlength='40'
                title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                style={{ width: 365 }}
                placeholder='Old password'
              />
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                name='newPassword'
                type='password'
                maxlength='40'
                pattern='(?=./d)(?=.[a-z])(?=.[A-Z]).{8,}'
                title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                style={{ width: 365 }}
                placeholder='New Password'
              />
            </FormGroup>
            <FormGroup className='Form-group'>
              <FormControl
                name='ConfirmNewPassword'
                type='password'
                maxlength='40'
                pattern='(?=./d)(?=.[a-z])(?=.[A-Z]).{8,}'
                title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                style={{ width: 365 }}
                placeholder='Confirm your new password'
              />
            </FormGroup>
            <FormGroup className='Form-group'>
              <span>Do you want to change your e-mail? Click </span>
              <NavLink href='#'>here</NavLink>
            </FormGroup>
            <FormControl
              type='submit'
              className='btn btn-primary btn-block'
              value='Accept'
            />
          </Form>
        </FormGroup>
      </Modal>
    );
  }
}

export default withRouter(ShowProfile);
