import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import Itinerary from '../createroute/Itinerary';

export default class ViewMap extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 15,
    isMapInit: false
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          ...this.state.location,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      ...this.state.isMapInit,
      isMapInit: true
    });
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        style={{ height: '100vh', zIndex: '0' }}
        ref={this.saveMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {this.state.isMapInit && (
          <Itinerary
            from={[50.0659, 36.28997]}
            to={[50.02049, 36.299935]}
            map={this.map}
          />
        )}
      </Map>
    );
  }
}
