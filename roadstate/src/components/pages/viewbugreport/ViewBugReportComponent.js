import React, { useState, useEffect } from 'react';
import ViewBugReport from './ViewBugReport';
import * as bugReportActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

const ViewBugReportComponent = props => {
  const fetchAPI = async () => {
    await props.actions.loadBugReportAsync(2);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  console.log(typeof props.bugReport.photos);
  debugger;
  return <ViewBugReport bugReport={props.bugReport} />;
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
