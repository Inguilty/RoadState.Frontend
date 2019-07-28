import React from 'react';
import SideNav, { NavItem } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Spinner } from '../../Spinner';

const defineColor = (state) => {
  switch (state) {
    case 'Low':
      return 'badge-danger';
    case 'Middle':
      return 'badge-warning';
    case 'High':
      return 'badge-success';
    default:
      return 'badge-dark';
  }
};

const defineBadge = (state) => {
  switch (state) {
    case 'Low':
      return 'Danger';
    case 'Middle':
      return 'Warning';
    case 'High':
      return 'Success';
    default:
      return 'Unknown';
  }
};

const stateEnum = { Low: 1, Middle: 2, High: 3 };

const Sidebar = ({
  onChoose, bugReports, isLoading, loadingRoads, roads, calculate,
}) => (
  <SideNav
    style={{
      backgroundColor: '#343A40',
      marginTop: '8vh',
      width: '6rem',
      overflow: 'hidden',
      height: '101vh',
      zIndex: '0',
    }}
    onSelect={(selected) => {
      onChoose(selected);
    }}
  >
    <SideNav.Toggle />
    <SideNav.Nav style={{ width: '100%', overflow: 'hidden' }} id="nav">
      <Button variant="info" onClick={calculate}>
        Show bug reports
      </Button>
      {isLoading || !bugReports || loadingRoads || !roads ? (
        <Spinner />
      ) : (
        bugReports
          .sort((a, b) => stateEnum[b.state] - stateEnum[a.state])
          .map(bugReport => (
            <NavItem eventKey={bugReport.id}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <i className="fas fa-map-marked-alt" style={{ fontSize: '36px' }} />
                <span className={`badge badge-pill ${defineColor(bugReport.state)}`}>
                  {defineBadge(bugReport.state)}
                </span>
                <span>{roads.find(x => x.id === bugReport.id).address}</span>
              </div>
            </NavItem>
          ))
      )}
    </SideNav.Nav>
  </SideNav>
);

Sidebar.propTypes = {
  onChoose: PropTypes.func.isRequired,
  bugReports: PropTypes.arrayOf.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingRoads: PropTypes.bool.isRequired,
  roads: PropTypes.arrayOf.isRequired,
  calculate: PropTypes.func.isRequired,
};

export default Sidebar;
