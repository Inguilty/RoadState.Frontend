import React from "react";
import { connect } from "react-redux";
import * as testActions from "../../redux/actions/testActions";

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        text: ""
      }
    };
  }

  handleChange = event => {
    const message = { ...this.state.message, text: event.target.value };
    this.setState({ message });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(testActions.createMessage(this.state.message));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Test redux features</h2>
        <h3>Create something</h3>
        <input
          type="text"
          value={this.state.message.text}
          onChange={this.handleChange}
        />
        <input type="submit" value="Send" />
        {this.props.messages.map(message => (
          <div key={message.text}>{message.text}</div>
        ))}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(TestComponent);
