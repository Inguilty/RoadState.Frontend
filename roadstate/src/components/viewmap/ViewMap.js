import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Popup } from 'react-leaflet';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Route from '../route/Route';
import CreateBugReport from '../createBugReport/CreateBugReport';
import * as rectangleBRactions from './actions';
import DisplayBg from '../displaybg/DisplayBg';
import { Spinner } from '../Spinner';
import Sidebar from '../pages/sidebar/Sidebar';

class ViewMap extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 14,
    isMapInit: false,
    from: [50.0659, 36.28997],
    to: [50.02049, 36.299935],
    todoList: {
      BRLocation: {
        lat: 51.505,
        lng: -0.09,
      },
      clicked: false,
    },
    routeCoords: [],
    roadBugReports: [],
  };

  componentDidMount() {
    const prevState = this.state;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          ...prevState.location,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  }

  distanceMapping = (pointCur, pointSrc) => {
    const dist = Math.sqrt((pointCur.lat - pointSrc.lat) ** 2 + (pointCur.lng - pointSrc.lng) ** 2);
    const LatLng = {
      distance: dist,
      point: {
        lat: pointCur.lat,
        lng: pointCur.lng,
      },
    };
    return LatLng;
  };

  saveMap = (map) => {
    this.map = map;
    this.setState({ isMapInit: true });
  };

  handleClick = (e) => {
    const { lat, lng } = e.latlng;
    const latitude = parseFloat(lat.toFixed(5));
    const longitude = parseFloat(lng.toFixed(5));
    const position = {
      lat: latitude,
      lng: longitude,
    };
    const val = this.contains(position);
    this.bGstate(val, position);
    this.calculateRectanglePoints();
  };

  straightEquation = (point1, point2, elem) => {
    let val;
    const k = (point2.lng - point1.lng) / (point2.lat - point1.lat);
    const b = (point2.lat * point1.lng - point1.lat * point2.lng) / (point2.lat - point1.lat);
    const H = Math.abs(elem.lng - k * elem.lat - b) / Math.sqrt(k * k + 1);
    const lamda = 0.00006;
    if (H >= lamda || Number.isNaN(H)) {
      val = false;
    } else {
      val = true;
    }
    return val;
  };

  contains = (elem) => {
    let val;
    const { routeCoords } = this.state;
    if (routeCoords.length !== 0) {
      const newRouteCoords = routeCoords.map(x => this.distanceMapping(x, elem));
      newRouteCoords.sort((a, b) => a.distance - b.distance);
      if (this.straightEquation(newRouteCoords[0].point, newRouteCoords[1].point, elem)) {
        val = true;
      } else {
        val = false;
      }
    } else {
      val = false;
    }
    return val;
  };

  bGstate = (val, position) => {
    const prevState = this.state;
    if (val) {
      if (prevState.todoList.clicked) {
        this.setState({
          todoList: {
            ...prevState.todoList,
            clicked: false,
          },
        });
      } else {
        this.setState({
          todoList: {
            ...prevState.todoList,
            BRLocation: {
              lat: position.lat,
              lng: position.lng,
            },
            clicked: true,
          },
        });
      }
    } else {
      this.setState({
        todoList: {
          ...prevState.todoList,
          clicked: false,
        },
      });
    }
  };

  getLats = arr => arr.map(d => d.lat);

  getLngs = arr => arr.map(d => d.lng);

  calculateRectanglePoints = () => {
    const { routeCoords } = this.state;
    const { bugReportRectangle } = this.props;
    if (routeCoords.length !== 0) {
      const minLat = Math.min(...this.getLats(routeCoords));
      const minLng = Math.min(...this.getLngs(routeCoords));
      const maxLat = Math.max(...this.getLats(routeCoords));
      const maxLng = Math.max(...this.getLngs(routeCoords));
      bugReportRectangle(minLng, maxLng, minLat, maxLat);
    }
  };

  handleZoomChange = (selected) => {
    const { rectangleBugReports } = this.props;
    const selectedLocation = {
      lng: rectangleBugReports.find(x => x.id === selected).location.longitude,
      lat: rectangleBugReports.find(x => x.id === selected).location.latitude,
    };
    this.setState({ location: selectedLocation, zoom: 20 });
  };

  handleBugReportsChange = (bugReports) => {
    this.setState({ roadBugReports: bugReports });
  };

  render() {
    const {
      from, to, location, zoom, isMapInit, todoList, routeCoords,
    } = this.state;

    const setBugReport = todoList.clicked ? (
      <Popup position={[todoList.BRLocation.lat, todoList.BRLocation.lng]}>
        <CreateBugReport />
      </Popup>
    ) : null;

    const position = [location.lat, location.lng];
    const { roadBugReports } = this.state;
    const { rectangleBugReports, isLoading } = this.props;
    return (
      <>
        <Map
          center={position}
          zoom={zoom}
          maxZoom={19}
          style={{ height: '100vh', zIndex: '0' }}
          ref={this.saveMap}
          onClick={this.handleClick}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {setBugReport}

          {isLoading || !rectangleBugReports || rectangleBugReports.length === 0 || !routeCoords ? (
            <Row>
              <Col>
                <Spinner />
              </Col>
            </Row>
          ) : (
            <DisplayBg
              bugReports={rectangleBugReports}
              roadPoints={routeCoords}
              handler={this.handleBugReportsChange}
            />
          )}

          {isMapInit && (
            <Route
              from={from}
              to={to}
              map={this.map}
              setState={(routeCoordinates) => {
                this.setState(routeCoordinates);
              }}
            />
          )}
        </Map>

        <Sidebar
          onChoose={this.handleZoomChange}
          bugReports={roadBugReports}
          isLoading={isLoading}
        />
      </>
    );
  }
}

ViewMap.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  rectangleBugReports: PropTypes.objectOf.isRequired,
  bugReportRectangle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.bugReportRectangle.isLoading,
  rectangleBugReports: state.bugReportRectangle.rectangleBugReports,
});

const mapDispatchToProps = {
  bugReportRectangle: rectangleBRactions.bugReportRectangle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewMap);
