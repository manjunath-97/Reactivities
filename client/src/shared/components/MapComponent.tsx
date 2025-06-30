import {MapContainer, Popup, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

type Props = {
     position : [number, number];
     venue : string;
};

const customIcon = new Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent( {position, venue} : Props)
{
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}   style={{ height: '400px', width: '100%' }} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    {venue}
                </Popup>
            </Marker>
        </MapContainer>
    );
}