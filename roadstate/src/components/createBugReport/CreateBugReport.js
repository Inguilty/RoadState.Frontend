import React from 'react';
import CreateBugReportForm from './CreateBugReportForm';

class CreateBugReport extends React.Component {
  state = { isModalActive: false };

  handleClose = () => this.setState({ isModalActive: false });

  handleShow = () => this.setState({ isModalActive: true });

  render() {
    return (
      <div>
        {/* Put here element that will call handleShow() property */}
        <CreateBugReportForm
          isActive={this.state.isModalActive}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateBugReport;
