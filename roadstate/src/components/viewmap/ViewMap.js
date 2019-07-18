import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import Route from '../route/Route';

export default class ViewMap extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 14,
    isMapInit: false,
    from: [50.0659, 36.28997],
    to: [50.02049, 36.299935],
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

  saveMap = (map) => {
    this.map = map;
    this.setState({ isMapInit: true });
  };

  render() {
    const {
      from, to, location, zoom, isMapInit,
    } = this.state;
    const position = [location.lat, location.lng];
    return (
      <Map
        center={position}
        zoom={zoom}
        style={{ height: '100vh', zIndex: '0' }}
        ref={this.saveMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isMapInit && (
          <Route
            from={from}
            to={to}
            map={this.map}
          />
        )}
      </Map>
    );
  }
}
