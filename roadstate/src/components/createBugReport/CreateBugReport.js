import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import CreateBugReportForm from './CreateBugReportForm';

class CreateBugReport extends React.Component {
  state = { isModalActive: false };

  handleClose = () => this.setState({ isModalActive: false });

  handleShow = () => this.setState({ isModalActive: true });

  render() {
    const { isModalActive } = this.state;
    const { locLong, locLat } = this.props;
    return (
      <div>
        <Button type="button" className="btn btn-primary" onClick={this.handleShow}>
          Create bug report
        </Button>
        <CreateBugReportForm
          isActive={isModalActive}
          onClose={this.handleClose}
          locLong={locLong}
          locLat={locLat}
        />
      </div>
    );
  }
}

CreateBugReport.propTypes = {
  locLong: PropTypes.objectOf.isRequired,
  locLat: PropTypes.objectOf.isRequired,
};

export default CreateBugReport;
