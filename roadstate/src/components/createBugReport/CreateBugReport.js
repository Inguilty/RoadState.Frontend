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
    const { locationLongitude, locationLatitude, routeCoordinates } = this.props;
    return (
      <div>
        <Button type="button" className="btn btn-primary" onClick={this.handleShow}>
          Create bug report
        </Button>
        <CreateBugReportForm
          isActive={isModalActive}
          onClose={this.handleClose}
          locationLongitude={locationLongitude}
          locationLatitude={locationLatitude}
          routeCoordinates={routeCoordinates}
        />
      </div>
    );
  }
}

CreateBugReport.propTypes = {
  locationLongitude: PropTypes.number.isRequired,
  locationLatitude: PropTypes.number.isRequired,
  routeCoordinates: PropTypes.objectOf.isRequired,
};

export default CreateBugReport;
