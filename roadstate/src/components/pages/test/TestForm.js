import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as testActions from './actions';

class TestForm extends React.Component {
  state = {
    message: {
      text: '',
    },
  };

  handleChange = (event) => {
    const { message } = this.state;
    const messageClone = { ...message, text: event.target.value };
    this.setState(
      {
        message: messageClone,
      },
      () => console.log('success'),
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { message } = this.state;
    const { testActionsDispatched } = this.props;
    testActionsDispatched.sendMessage(message);
  };

  render() {
    const { message } = this.state;
    const { messages } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="testinput">
            Your message
            <input
              className="form-control"
              type="text"
              id="testinput"
              onChange={this.handleChange}
              placeholder="Enter message"
              value={message.text}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Send your message!
          </button>
          {messages.map(currentMessage => (
            <div key={currentMessage.text}>{currentMessage.text}</div>
          ))}
        </div>
      </form>
    );
  }
}

TestForm.propTypes = {
  messages: PropTypes.arrayOf.isRequired,
  testActionsDispatched: PropTypes.objectOf.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    testActionsDispatched: bindActionCreators(testActions, dispatch),
  }),
)(TestForm);
