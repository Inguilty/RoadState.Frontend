import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaMapMarkedAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Spinner } from '../../Spinner';

const Sidebar = ({ onChoose, bugReports, isLoading }) => (
  <SideNav
    style={{ backgroundColor: '#343A40', marginTop: '8vh' }}
    onSelect={selected => onChoose(selected)}
  >
    <SideNav.Toggle />
    <SideNav.Nav>
      {isLoading || !bugReports ? (
        <Spinner />
      ) : (
        bugReports.map(bugReport => (
          <NavItem eventKey={bugReport.id}>
            <NavIcon>
              <FaMapMarkedAlt />
            </NavIcon>
            <NavText>
              {bugReport.description}
, status:
              {bugReport.state}
            </NavText>
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
};

export default Sidebar;
