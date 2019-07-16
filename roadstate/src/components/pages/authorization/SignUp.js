import React from 'react';
import './authorization.css';
import Modal from 'react-modal';
import { withRouter, NavLink } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormGroup,
  FormCheck,
  FormLabel,
  Row,
  Col,
} from 'react-bootstrap';
import customStyles from './customStyles';

export const IMAGE_MAX_SIZE = 16777215;

class SignUpPage extends React.Component {
  handleFileChanging = (e) => {
    if (e.target.files[0].size > IMAGE_MAX_SIZE) {
      e.target.value = null;
      this.handleImageAlertShow();
    }
  };

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
    this.setState({ isModalVisible: false });
    this.props.history.goBack();
  };

  render() {
    return (
      <Modal
        isOpen={this.state.isModalVisible}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Sign up</h2>
        <FormGroup className="Form-wrapper">
          <Form action="#" method="post">
            <p className="hint-text">
              * - Fill in this Form to create your account!
            </p>

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

                <FormLabel
                  className="custom-file-label"
                  htmlFor="inputGroupFile01"
                >
                  Choose file
                </FormLabel>
              </FormGroup>
            </FormGroup>

            <FormGroup className="Form-group">
              <FormControl
                name="UserName"
                type="text"
                maxlength="30"
                style={{ width: 365 }}
                placeholder="Username*"
                required
              />
            </FormGroup>
            <FormGroup className="Form-group">
              <FormControl
                name="FromEmailAddress"
                type="email"
                maxlength="60"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                style={{ width: 365 }}
                placeholder="Email*"
                required
              />
            </FormGroup>
            <FormGroup className="Form-group">
              <FormControl
                name="Password"
                type="password"
                maxlength="40"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                style={{ width: 365 }}
                placeholder="Password*"
                required
              />
            </FormGroup>
            <FormGroup className="Form-group">
              <FormControl
                name="ConfirmPassword"
                type="password"
                maxlength="40"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                style={{ width: 365 }}
                placeholder="Confirm your password*"
                required
              />
            </FormGroup>

            <Row>
              <Col sm="1">
                <FormCheck type="checkbox" required="required" />
              </Col>
              <Col>
                <FormLabel className="checkbox-inline">
                  {' '}
                  I accept the
                  {' '}
                  <NavLink href="#">Terms &amp; Conditions</NavLink>
                </FormLabel>
              </Col>
            </Row>
            <FormControl
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign up"
            />
          </Form>
        </FormGroup>
      </Modal>
    );
  }
}

export default withRouter(SignUpPage);
