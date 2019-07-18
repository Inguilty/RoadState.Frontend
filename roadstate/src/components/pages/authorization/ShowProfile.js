import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import '../authorization/authorization.css';
import customStyles from '../authorization/customStyles';
import { FormControl, FormGroup, FormLabel, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userActions } from './actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class ShowProfile extends React.Component {
  state = {
    isModalVisible: false,
    image: this.props.user.avatar,
    imagePreviewUrl: this.props.user.avatarUrl
  };

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

  initialState = {
    username: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    avatar: ''
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
        'You must enter at least 1 number, 1 upper and lowercase letter.'
      ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    )
  });

  handleSubmit = e => {
    const { update, user } = this.props;
    const updatedUser = {
      ...user,
      avatar: e.avatar,
      avatarUrl: e.avatarUrl,
      password: e.newPassword
    };
    const { dispatch } = this.props;
    if (e.password && e.newPassword && e.confirmNewPassword) {
      dispatch(update(updatedUser));
    }
    this.closeModal();
  };

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

  render() {
    const { user } = this.props;
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
            contentLabel='Example Modal'
          >
            <FormGroup className='Form-wrapper'>
              <Form action='#' method='post'>
                <center>
                  <div>{$imagePreview}</div>
                </center>
                <span>Do you want to change your avatar?</span>
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

                <FormGroup className='Form-group'>
                  <FormControl
                    name='username'
                    type='text'
                    style={{ width: 365 }}
                    placeholder={user.username}
                    readOnly
                  />
                </FormGroup>
                <FormGroup className='Form-group'>
                  <FormControl
                    name='email'
                    type='text'
                    style={{ width: 365 }}
                    placeholder={user.email}
                    readOnly
                  />
                </FormGroup>
                <FormGroup className='form-group'>
                  <span>Do you want to change password?</span>
                </FormGroup>
                <FormGroup className='Form-group'>
                  <Field
                    name='password'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='Old password'
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
                    name='newPassword'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='New password'
                    className={
                      'form-control' +
                      (errors.newPassword && touched.newPassword
                        ? ' is-invalid'
                        : '')
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
                    name='confirmNewPasword'
                    type='password'
                    style={{ width: 365 }}
                    placeholder='Confirm new password'
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
                <FormGroup className='Form-group'>
                  <span>Do you want to change your e-mail? Click </span>
                  <NavLink href='#'>here</NavLink>
                </FormGroup>
                <FormControl
                  type='submit'
                  className='btn btn-primary btn-block'
                  value='Update'
                />
              </Form>
            </FormGroup>
          </Modal>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  update: userActions.update
});

export default connect(mapStateToProps)(ShowProfile);
