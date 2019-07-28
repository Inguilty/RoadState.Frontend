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
    token: PropTypes.objectOf.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    rateBugReport: PropTypes.func.isRequired,
    userId: PropTypes.objectOf.isRequired,
  };

  handleOpen = () => {
    this.setState({ isModalOpened: true });
  };

  handleClose = () => {
    this.setState({ isModalOpened: false });
  };

  handleClick = (event) => {
    const id = +event.currentTarget.id;
    const { loadBugReport, userId } = this.props;
    loadBugReport(id, userId);
    this.handleOpen();
  };

  handleCommentChange = () => {};

  handlePoll = (event) => {
    const { bugReport, rateBugReport, token } = this.props;
    const { currentBugReport } = bugReport;
    const currentRating = currentBugReport.rating;
    const bugReportDispatched = {
      ...currentBugReport,
      rating: event.target.value === 'true' ? currentRating + 1 : currentRating - 1,
    };
    const rate = event.target.value === 'true' ? 'agree' : 'disagree';
    rateBugReport(bugReportDispatched, rate, token);
  };

  render() {
    const { isModalOpened } = this.state;
    const { id, bugReport, loggedIn } = this.props;
    const { loadingBugReport, currentBugReport, loadingBugReportRating } = bugReport;
    if (!loadingBugReport && !currentBugReport) {
      return (
        <Button id={id} onClick={this.handleClick} variant="success">
          View bug report
        </Button>
      );
    }
    return (
      <div>
        <Button id={id} onClick={this.handleClick} variant="success">
          View bug report
        </Button>
        {!currentBugReport || loadingBugReport ? (
          <Row>
            <Col>
              <center>
                <Spinner />
              </center>
            </Col>
          </Row>
        ) : (
          <BugReport
            loggedIn={loggedIn}
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

const mapStateToProps = ({ bugReport, authorization }) => ({
  bugReport,
  loggedIn: authorization.loggedIn,
  token: authorization.token,
  userId: authorization.userId,
});

export default connect(
  mapStateToProps,
  { loadBugReport: bugReportActions.loadBugReport, rateBugReport: bugReportActions.rateBugReport },
)(WithBugReport);
