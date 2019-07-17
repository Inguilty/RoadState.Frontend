import React from 'react';
import CreateBugReportForm from './CreateBugReportForm';

class CreateBugReport extends React.Component {
  state = { isModalActive: false };

  handleClose = () => this.setState({ isModalActive: false });

  handleShow = () => this.setState({ isModalActive: true });

  render() {
    const { isModalActive } = this.state;
    return (
      <div>
        {/* Put here element that will call handleShow() property */}
        <CreateBugReportForm
          isActive={isModalActive}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateBugReport;
