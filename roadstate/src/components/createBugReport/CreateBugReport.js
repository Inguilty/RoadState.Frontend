import React from 'react';
import { Button } from 'react-bootstrap';
import CreateBugReportForm from './CreateBugReportForm';

class CreateBugReport extends React.Component {
  state = { isModalActive: false };

  handleClose = () => this.setState({ isModalActive: false });

  handleShow = () => this.setState({ isModalActive: true });

  render() {
    const { isModalActive } = this.state;
    return (
      <div>
        <Button type="button" className="btn btn-primary" onClick={this.handleShow}>
          Create bug report
        </Button>
        <CreateBugReportForm
          isActive={isModalActive}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateBugReport;
