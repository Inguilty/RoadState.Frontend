import React, { useState, useEffect } from 'react';
import ViewBugReport from './ViewBugReport';
import * as bugReportActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

const ViewBugReportComponent = props => {
  const fetchAPI = async () => {
    await props.actions.loadBugReportAsync(1);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const [bugReport, setBugReport] = useState();
  debugger;
  const [comment, setComment] = useState({
    userName: 'Test',
    text: '',
    likes: 0,
    dislikes: 0
  });

  const handleChange = event => {
    const changedComment = setComment({ changedComment });
  };

  const handleSubmit = event => {
    event.preventDefault();
    debugger;
    const changedBugReport = {
      ...bugReport,
      comments: [...bugReport.comments, comment]
    };
    setBugReport({ changedBugReport });
    props.dispatch(bugReportActions.addCommentToBugReport(bugReport));
  };

  const toString = {}.toString;
  console.log(toString.call(props.bugReport.photos));
  debugger;
  return (
    <>
      <ViewBugReport
        bugReport={props.bugReport}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {props.bugReport.comments === undefined ||
      props.bugReport.comments.length === 0 ? (
        <p>no comments</p>
      ) : (
        <p>{props.bugReport.comments.length}</p>
      )}
    </>
  );
};

const mapStateToProps = state => ({ bugReport: state.bugReport });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(bugReportActions, dispatch)
});

ViewBugReportComponent.propTypes = {
  bugReport: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBugReportComponent);
