import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import bug_report from './bug_report.png';
import WithBugReport from '../pages/bugreport/WithBugReport';

class DisplayBg extends Component {
  brIcon = L.icon({
    iconUrl: bug_report,
    iconSize: [29, 46],
    iconAnchor: [12, 41],
    popupAnchor: [2, -34],
  });

  isOnRoadFull = (arrayBr, arrayPoints) => {
    const newArray = [];
    for (let i = 0; i < arrayPoints.length - 1; i++) {
      for (let j = 0; j < arrayBr.length; j++) {
        if (this.isOnRoadSection(arrayBr[j].location, [arrayPoints[i], arrayPoints[i + 1]])) {
          if (newArray.length !== 0) {
            if (newArray.includes(arrayBr[j])) {
              continue;
            } else {
              newArray.push(arrayBr[j]);
            }
          } else {
            newArray.push(arrayBr[j]);
            continue;
          }
        }
      }
    }
    debugger;
    return newArray;
  };

  isOnRoadSection = (pointLocation, roadLocations) => {
    const errorSize = 0.00006;
    for (let i = 0; i < roadLocations.length - 1; i++) {
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
    const { bugReports, roadPoints } = this.props;
    debugger;
    if (roadPoints.length !== 0) {
      if (bugReports.length !== 0) {
        const newArray = this.isOnRoadFull(bugReports, roadPoints);
        return newArray.map(marker => (
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
    }
  };

  render() {
    return <div>{this.renderMarkers()}</div>;
  }
}

export default DisplayBg;
