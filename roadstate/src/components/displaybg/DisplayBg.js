import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { PropTypes } from 'prop-types';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import bugReport from './bugReport.png';
import WithBugReport from '../pages/bugreport/WithBugReport';

class DisplayBg extends Component {
  brIcon = L.icon({
    iconUrl: bugReport,
    iconSize: [29, 46],
    iconAnchor: [12, 41],
    popupAnchor: [2, -34],
  });

  renderMarkers = () => {
    const { bugReports } = this.props;
    return bugReports.map(marker => (
      <Marker
        key={`${marker.id}`}
        position={[marker.location.latitude, marker.location.longitude]}
        icon={this.brIcon}
      >
        <Popup>
          <WithBugReport id={marker.id} />
        </Popup>
      </Marker>
    ));
  };

  render() {
    return <div>{this.renderMarkers()}</div>;
  }
}

export default DisplayBg;

DisplayBg.propTypes = {
  bugReports: PropTypes.objectOf.isRequired,
};
