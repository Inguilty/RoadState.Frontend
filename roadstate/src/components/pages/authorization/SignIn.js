import React from 'react';
import './authorization.css';
import Modal from 'react-modal';
import { PropTypes } from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import customStyles from './customStyles';

class SignInPage extends React.Component {
  state = {
    isModalVisible: false,
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

  render() {
    const { isModalVisible } = this.state;
    return (
      <Modal
        isOpen={isModalVisible}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Sign in</h2>
        <FormGroup class="Form-wrapper">
          <Form action="/examples/actions/confirmation.php" method="post">
            <p className="hint-text">Sign in with your google account</p>
            <FormGroup>
              <NavLink href="#" className="btn scl-md">
                <i className="icon" />
              </NavLink>
            </FormGroup>
            <FormGroup class="or-seperator">
              <b>or</b>
            </FormGroup>
            <FormGroup class="Form-group">
              <FormControl
                type="text"
                class="Form-control"
                placeholder="Username"
                required="required"
              />
            </FormGroup>
            <FormGroup class="Form-group">
              <FormControl
                type="password"
                class="Form-control"
                placeholder="Password"
                required="required"
              />
            </FormGroup>
            <FormControl
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign up"
            />
            <FormGroup class="Form-footer">
              <NavLink href="#">Forgot Your password?</NavLink>
            </FormGroup>
          </Form>
        </FormGroup>
      </Modal>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default withRouter(SignInPage);
