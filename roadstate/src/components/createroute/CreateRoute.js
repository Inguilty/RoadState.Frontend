import { MapLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { withLeaflet } from "react-leaflet";

class CreateRoute extends MapLayer {
  createLeafletElement() {
    const { map, from, to } = this.props;
    var road = [];
    road.push(L.latLng(from[0], from[1]), L.latLng(to[0], to[1]));

    let leafletElement = L.Routing.control({
      waypoints: road,
      lineOptions: {
        styles: [
          {
            color: "#2377A4",
            opacity: 1.0,
            weight: 6
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: true,
      altLineOptions: { styles: [{ opacity: 1.0 }] }
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(CreateRoute);
