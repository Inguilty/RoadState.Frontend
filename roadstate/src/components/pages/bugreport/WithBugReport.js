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
    comment: {
      authorName: '',
      likes: 0,
      dislikes: 0,
      text: '',
      publishDate: new Date().toISOString(),
    },
  };

  static propTypes = {
    loadingBugReport: PropTypes.bool.isRequired,
    loadBugReport: PropTypes.func.isRequired,
    bugReport: PropTypes.objectOf.isRequired,
    id: PropTypes.number.isRequired,
    rateBugReport: PropTypes.func.isRequired,
    authorization: PropTypes.objectOf.isRequired,
    loadUserName: PropTypes.func.isRequired,
    addCommentDispatched: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { authorization, loadUserName } = this.props;
    const { userId } = authorization;
    if (userId && userId !== '') {
      loadUserName(userId);
    }
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

  handleCommentChange = (event) => {
    const { bugReport } = this.props;
    const { userName } = bugReport;
    const { comment } = this.state;
    this.setState({
      comment: { ...comment, text: event.currentTarget.value, authorName: userName },
    });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    this.setState({ comment: { ...comment } });
    const { addCommentDispatched, bugReport } = this.props;
    const { currentBugReport } = bugReport;
    const { commentDispatched } = this.state;
    addCommentDispatched({ ...currentBugReport }, commentDispatched);
  };

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
            bugReport={currentBugReport}
            isOpened={isModalOpened}
            onClose={this.handleClose}
            onPoll={this.handlePoll}
            isLoadingRating={loadingBugReportRating}
            onComment={this.handleCommentChange}
            onCommentSubmit={this.handleCommentSubmit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ bugReport, authorization }) => ({ bugReport, authorization });

export default connect(
  mapStateToProps,
  {
    loadBugReport: bugReportActions.loadBugReport,
    rateBugReport: bugReportActions.rateBugReport,
    loadUserName: bugReportActions.loadUserName,
    addCommentDispatched: bugReportActions.addCommentToBugReport,
  },
)(WithBugReport);
