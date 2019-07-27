import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as rectangleBRactions from './actions';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/examples/Control.Geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

class Route extends MapLayer {
  getLats = arr => arr.map(d => d.lat);

  getLngs = arr => arr.map(d => d.lng);

  calculateRectanglePoints = (array) => {
    const { getBugReportRectangle } = this.props;
    if (array.length !== 0) {
      const minLat = Math.min(...this.getLats(array));
      const minLng = Math.min(...this.getLngs(array));
      const maxLat = Math.max(...this.getLats(array));
      const maxLng = Math.max(...this.getLngs(array));
      getBugReportRectangle(minLng, maxLng, minLat, maxLat);
    }
  };

  isOnRoadFull = (arrayBr, arrayPoints) => {
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
    return newArray;
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

  createLeafletElement() {
    const { from, to, map } = this.props;
    const waypoints = [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])];
    const markerUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=';
    const leafletElement = L.Routing.control({
      plan: L.Routing.plan(waypoints, {
        createMarker: (i, wp) => L.marker(wp.latLng, {
          draggable: true,
          title: `marker ${i + 1}`,
          icon: L.icon({
            iconUrl: markerUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -45],
          }),
        }),
        geocoder: L.Control.Geocoder.nominatim(),
      }),
      routeWhileDragging: false,
      routeDragTimeout: 250,
      showAlternatives: true,
      addWaypoints: false,
      altLineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 0.5, weight: 2 },
        ],
      },
      collapsible: true,
    });

    leafletElement
      .on(
        'routeselected',
        (routes) => {
          const routeCoordsNew = routes.route.coordinates;
          this.calculateRectanglePoints(routeCoordsNew);
          this.routeHandler(routeCoordsNew);
        },
        this,
      )
      .addTo(map.leafletElement);

    leafletElement.hide();
    return leafletElement.getPlan();
  }

  routeHandler = (routeCoordsNew) => {
    const { bugReports } = this.props;
    if (bugReports.length !== 0) {
      const newArray = this.isOnRoadFull(bugReports, routeCoordsNew);
      this.props.setState({
        routeCoords: routeCoordsNew,
        rectangleBrs: newArray,
      });
    }
  };
}

Route.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  bugReports: PropTypes.objectOf.isRequired,
  getBugReportRectangle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.bugReportRectangle.isLoading,
  bugReports: state.bugReportRectangle.bugReports,
});

const mapDispatchToProps = {
  getBugReportRectangle: rectangleBRactions.getBugReportRectangle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLeaflet(Route));
