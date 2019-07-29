import React from 'react';
import SideNav, { NavItem } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import PropTypes from 'prop-types';
import { Spinner } from '../../Spinner';
import './Sidebar.css';

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
  onChoose, bugReports, isLoading, loadingRoads, roads,
}) => (
  <SideNav
    style={{
      backgroundColor: '#343A40',
      marginTop: '5vh',
      width: '6em',
      overflow: 'hidden',
      height: '101vh',
      zIndex: '0',
    }}
    onSelect={(selected) => {
      onChoose(selected);
    }}
  >
    <SideNav.Toggle style={{ left: '35px' }} />
    <SideNav.Nav style={{ width: '100%', overflow: 'hidden' }} id="nav">
      {isLoading || !bugReports || loadingRoads || !roads ? (
        <div style={{ marginLeft: '30px', marginTop: '10px' }}>
          <Spinner />
        </div>
      ) : (
        bugReports
          .sort((a, b) => stateEnum[b.state] - stateEnum[a.state])
          .map(bugReport => (
            <NavItem eventKey={bugReport.id}>
              <div style={{
                overflow: 'hidden',
                lineHeight: '10px',
                height: '70px',
                marginTop: '5px',
                marginLeft: '20px',
              }}
              >
                <i className="fas fa-map-marked-alt" style={{ fontSize: '36px', marginLeft: '4px' }} />
                <span style={{ marginLeft: '40px' }}>{roads.find(x => x.id === bugReport.id).address}</span>
                <p> </p>
                <span className={`badge badge-pill ${defineColor(bugReport.state)}`}>
                  {defineBadge(bugReport.state)}
                </span>
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
};

export default Sidebar;
