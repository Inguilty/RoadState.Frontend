import React from "react";
import { connect } from "react-redux";
import { sendMessage } from "./actions";
import PropTypes from "prop-types";

class TestForm extends React.Component {
  state = {
    message: {
      text: ""
    }
  };

  handleChange = event => {
    const message = { ...this.state.message, text: event.target.value };
    this.setState({ message });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.state.message);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="testinput">Your message</label>
          <input
            className="form-control"
            type="text"
            id="testinput"
            onChange={this.handleChange}
            placeholder="Enter message"
            value={this.state.message.text}
          />
          <button type="submit" className="btn btn-success">
            Send your message!
          </button>
          {this.props.messages.map(message => (
            <div key={message.text}>{message.text}</div>
          ))}
        </div>
      </form>
    );
  }
}

TestForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

const mapDispatchToProps = {
  sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestForm);
