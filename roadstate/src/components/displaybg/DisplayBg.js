import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import bugReport from './bugReport.png';
import WithBugReport from '../pages/bugreport/WithBugReport';
import { Spinner } from '../Spinner';

class DisplayBg extends Component {
  state = {
    roadBugReports: [],
  };

  brIcon = L.icon({
    iconUrl: bugReport,
    iconSize: [29, 46],
    iconAnchor: [12, 41],
    popupAnchor: [2, -34],
  });

  static propTypes = {
    bugReports: PropTypes.arrayOf.isRequired,
    roadPoints: PropTypes.arrayOf.isRequired,
    handler: PropTypes.func.isRequired,
    calculate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { bugReports, roadPoints } = this.props;
    this.isOnRoadFull(bugReports, roadPoints);
  }

  componentDidUpdate(prevProps) {
    const { roadPoints, calculate } = this.props;
    if (prevProps.roadPoints !== roadPoints && prevProps.roadPoints.length !== roadPoints.length) {
      calculate();
    }
  }

  isOnRoadFull = (arrayBr, arrayPoints) => {
    const { handler } = this.props;
    const newArray = [];
    for (let i = 0; i < arrayPoints.length - 1; i += 1) {
      for (let j = 0; j < arrayBr.length; j += 1) {
        if (this.isOnRoadSection(arrayBr[j].location, [arrayPoints[i], arrayPoints[i + 1]])) {
          if (newArray.length !== 0) {
            if (!newArray.includes(arrayBr[j])) {
              newArray.push(arrayBr[j]);
            }
          } else {
            newArray.push(arrayBr[j]);
          }
        }
      }
    }
    handler(newArray);
    this.setState({ roadBugReports: newArray });
  };

  isOnRoadSection = (pointLocation, roadLocations) => {
    const errorSize = 0.00006;
    for (let i = 0; i < roadLocations.length - 1; i += 1) {
      const linearCoeffs = this.calculateLineCoeffs(roadLocations[i], roadLocations[i + 1]);
      if (
        pointLocation.longitude * linearCoeffs.slope + linearCoeffs.intercept
          >= pointLocation.latitude - errorSize
        && pointLocation.longitude * linearCoeffs.slope + linearCoeffs.intercept
          <= pointLocation.latitude + errorSize
      ) {
        return true;
      }
    }
    return false;
  };

  calculateLineCoeffs = (start, end) => {
    const k = (end.lat - start.lat) / (end.lng - start.lng);
    const b = start.lat - k * start.lng;
    const obj = {
      slope: k,
      intercept: b,
    };
    return obj;
  };

  handleShowInfo = () => {};

  renderMarkers = () => {
    const { roadBugReports } = this.state;
    if (roadBugReports && roadBugReports.length !== 0) {
      return roadBugReports.map(marker => (
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
    }
    return <Spinner />;
  };

  render() {
    const { roadPoints } = this.props;
    return (
      <div>
        {this.renderMarkers()}
        {roadPoints.map(x => (
          <div style={{ display: 'none' }}>{`${x.lng} ${x.lat}`}</div>
        ))}
      </div>
    );
  }
}

export default DisplayBg;
