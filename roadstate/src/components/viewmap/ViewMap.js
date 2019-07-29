import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Map, TileLayer, Popup, Marker,
} from 'react-leaflet';
import L from 'leaflet';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Route from '../route/Route';
import CreateBugReport from '../createBugReport/CreateBugReport';
import * as rectangleBRactions from './actions';
import { Spinner } from '../Spinner';
import Sidebar from '../pages/sidebar/Sidebar';
import DisplayBugReport from '../displayBugReport/DisplayBugReport';

const brIcon = L.icon({
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -45],
});

class ViewMap extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 14,
    isMapInit: false,
    from: {
      lat: 0.0,
      lng: 0.0,
    },
    to: {
      lat: 0.0,
      lng: 0.0,
    },
    todoList: {
      BRLocation: {
        lat: 51.505,
        lng: -0.09,
      },
      clicked: false,
    },
    routeCoords: [],
    roadBugReports: [],
    simpleClick: false,
    clickLocation: {
      lat: 0.0,
      lng: 0.0,
    },
    setRoutingPopUp: false,
    setFirstMarker: false,
    setSecondMarker: false,
    allowToSetPoints: true,
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
    const A = (pointCur.lat - pointSrc.lat) ** 2;
    const B = (pointCur.lng - pointSrc.lng) ** 2;
    const dist = Math.sqrt(A + B);
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
    const prevState = this.state;
    const { lat, lng } = e.latlng;
    const latitude = parseFloat(lat.toFixed(5));
    const longitude = parseFloat(lng.toFixed(5));
    const position = {
      lat: latitude,
      lng: longitude,
    };
    if(prevState.allowToSetPoints){
      if (prevState.simpleClick) {
        this.setState({
          ...prevState.simpleClick,
          simpleClick: false,
        });
      } else {
        this.setState({
          ...prevState.simpleClick,
          clickLocation: {
            lat: position.lat,
            lng: position.lng,
          },
          simpleClick: true,
          setRoutingPopUp: true,
        });
      }
    } else {
      const val = this.contains(position);
      this.bGstate(val, position);
    }
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

  handleZoomChange = (selected) => {
    const { bugReports } = this.props;
    const selectedLocation = {
      lng: bugReports.find(x => x.id === selected).location.longitude,
      lat: bugReports.find(x => x.id === selected).location.latitude,
    };
    this.setState({ location: selectedLocation, zoom: 20 });
  };

  handleBugReportsChange = (bugReports) => {
    this.setState({ roadBugReports: bugReports });
    const { loadRoadNames } = this.props;
    loadRoadNames(bugReports);
  };

  handleCalculate = () => {
    this.calculateRectanglePoints();
  };

  startBtnOnClick = () => {
    const prevState = this.state;
    const { clickLocation, setRoutingPopUp } = prevState;
    this.setState({
      ...prevState.setRoutingPopUp,
      from: {
        lat: clickLocation.lat,
        lng: clickLocation.lng,
      },
      setRoutingPopUp: false,
      simpleClick: false,
      setFirstMarker: true,
    });
  };

  endBtnOnClick = () => {
    const prevState = this.state;
    const { clickLocation, setRoutingPopUp } = prevState;
    this.setState({
      ...prevState.setRoutingPopUp,
      to: {
        lat: clickLocation.lat,
        lng: clickLocation.lng,
      },
      setRoutingPopUp: false,
      simpleClick: false,
      setSecondMarker: true,
    });
  };

  render() {
    const {
      from,
      to,
      location,
      zoom,
      isMapInit,
      todoList,
      routeCoords,
      simpleClick,
      roadBugReports,
      clickLocation,
      setRoutingPopUp,
      setFirstMarker,
      setSecondMarker,
      allowToSetPoints
    } = this.state;

    const {
      bugReports, isLoading, roads, loadingRoads,
    } = this.props;

    const setBugReport = todoList.clicked ? (
      <Popup position={[todoList.BRLocation.lat, todoList.BRLocation.lng]}>
        <CreateBugReport />
      </Popup>
    ) : null;

    const startBtn = (
      <Button style={{width: '5em'}} type="button" className="btn btn-info" onClick={this.startBtnOnClick}>
        From
      </Button>
    );
    const endBtn = (
      <Button style={{marginLeft: '5px', width: '5em'}} type="button" className="btn btn-primary" onClick={this.endBtnOnClick}>
        To
      </Button>
    );

    const setPoints = simpleClick && setRoutingPopUp && allowToSetPoints ? (
      <Popup position={[clickLocation.lat, clickLocation.lng]}>
        <div>
          {startBtn}
          {endBtn}
        </div>
      </Popup>
    ) : null;

    const firstMarker = setFirstMarker ? (
      <Marker position={[from.lat, from.lng]} icon={brIcon} />
    ) : null;
    const secondMarker = setSecondMarker ? (
      <Marker position={[to.lat, to.lng]} icon={brIcon} />
    ) : null;

    const position = [location.lat, location.lng];
    return (
      <>
        <Map
          center={position}
          zoom={zoom}
          maxZoom={19}
          attributionControl
          zoomControl
          doubleClickZoom
          scrollWheelZoom
          dragging
          animate
          duration={1}
          easeLinearity={0.1}
          style={{ height: '100vh', zIndex: '0' }}
          ref={this.saveMap}
          onClick={this.handleClick}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {setBugReport}

          {/* {isLoading || !bugReports || bugReports.length === 0 || !routeCoords ? (
            <Row>
              <Col>
                <Spinner />
              </Col>
            </Row>
          ) : (
            <DisplayBugReport
              bugReports={bugReports}
              roadPoints={routeCoords}
              handler={this.handleBugReportsChange}
              calculate={this.handleCalculate}
            />
          )} */}
          {setPoints}
          {firstMarker}
          {secondMarker}
          {isMapInit && from.lat !== 0.0 && from.lng !== 0.0 && to.lat !== 0.0 && to.lng !== 0.0 ? (
            <Route
              from={from}
              to={to}
              map={this.map}
              setState={(routeCoordinates,setFirstMarker,setSecondMarker, allowToSetPoints) => {
                this.setState(routeCoordinates,setFirstMarker,setSecondMarker,allowToSetPoints);
              }}
            />
          ) : null}
        </Map>
        <Sidebar
          onChoose={this.handleZoomChange}
          bugReports={roadBugReports}
          isLoading={isLoading}
          loadingRoads={loadingRoads}
          roads={roads}
          calculate={this.handleCalculate}
        />
      </>
    );
  }
}

ViewMap.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  bugReports: PropTypes.objectOf.isRequired,
  loadRoadNames: PropTypes.func.isRequired,
  loadingRoads: PropTypes.bool.isRequired,
  roads: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.bugReportRectangle.isLoading,
  bugReports: state.bugReportRectangle.bugReports,
  loadingRoads: state.bugReportRectangle.loadingRoadName,
  roads: state.bugReportRectangle.bugReportsRoadNames,
});

const mapDispatchToProps = {
  getBugReportRectangle: rectangleBRactions.getBugReportRectangle,
  loadRoadNames: rectangleBRactions.loadRoadName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewMap);
