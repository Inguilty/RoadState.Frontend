import React from 'react';
import { PropTypes } from 'prop-types';
import CreateBugReportForm from './CreateBugReportForm';

class CreateBugReport extends React.Component {
  state = { isModalActive: false };

  handleClose = () => this.setState({ isModalActive: false });

  handleShow = () => this.setState({ isModalActive: true });

  render() {
    const { isModalActive } = this.state;
    const { locLog, locLat } = this.props;
    return (
      <div>
        {/* Put here element that will call handleShow() property */}
        <button type="button" onClick={this.handleShow}>press me!</button>
        <CreateBugReportForm
          isActive={isModalActive}
          onClose={this.handleClose}
          locLog={locLog}
          locLat={locLat}
        />
      </div>
    );
  }
}

CreateBugReport.propTypes = {
  locLog: PropTypes.objectOf.isRequired,
  locLat: PropTypes.objectOf.isRequired,
};

export default CreateBugReport;
