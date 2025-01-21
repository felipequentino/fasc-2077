import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  const position = [-10.940897170139603, -37.105523618788354]; // COORdenadas ufs

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>
            <img 
              src="https://i.scdn.co/image/ab67616d0000b273a7bb97684153cd195be77054" 
              alt="Popup Image" 
              style={{ width: '150px', height: '150px', borderRadius: '8px' }}
            />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
