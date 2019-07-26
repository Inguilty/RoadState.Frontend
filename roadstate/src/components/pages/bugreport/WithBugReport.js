import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as bugReportActions from './actions';
import { Spinner } from '../../Spinner';
import BugReport from './BugReport';

class WithBugReport extends Component {
  state = {
    isModalOpened: false,
  };

  static propTypes = {
    loadingBugReport: PropTypes.bool.isRequired,
    loadBugReport: PropTypes.func.isRequired,
    bugReport: PropTypes.objectOf.isRequired,
    id: PropTypes.number.isRequired,
    rateBugReport: PropTypes.func.isRequired,
  };

  handleOpen = () => {
    this.setState({ isModalOpened: true });
  };

  handleClose = () => {
    this.setState({ isModalOpened: false });
  };

  handleClick = (event) => {
    const id = +event.currentTarget.id;
    const { loadBugReport } = this.props;
    loadBugReport(id);
    this.handleOpen();
  };

  handleCommentChange = () => { };

  handlePoll = (event) => {
    const { bugReport, rateBugReport } = this.props;
    const { currentBugReport } = bugReport;
    const currentRating = currentBugReport.rating;
    const bugReportDispatched = {
      ...currentBugReport,
      rating: event.target.value === 'true' ? currentRating + 1 : currentRating - 1,
    };
    const rate = event.target.value === 'true' ? 'agree' : 'disagree';
    rateBugReport(bugReportDispatched, rate);
  };

  render() {
    const { isModalOpened } = this.state;
    const { id, bugReport } = this.props;
    const { loadingBugReport, currentBugReport, loadingBugReportRating } = bugReport;
    return (
      <div>
        <Button id={id} onClick={this.handleClick} variant="success">
          View bug report
        </Button>
        {loadingBugReport || !currentBugReport ? (
          <Row>
            <Col>
              <center><Spinner /></center>
            </Col>
          </Row>
        ) : (
            <BugReport
              bugReport={currentBugReport}
              isOpened={isModalOpened}
              onClose={this.handleClose}
              onPoll={this.handlePoll}
              isLoadingRating={loadingBugReportRating}
              onComment={this.handleCommentChange}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ bugReport }) => ({ bugReport });

export default connect(
  mapStateToProps,
  { loadBugReport: bugReportActions.loadBugReport, rateBugReport: bugReportActions.rateBugReport },
)(WithBugReport);
