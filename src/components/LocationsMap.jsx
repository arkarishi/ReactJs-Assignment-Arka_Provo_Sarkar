import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue with bundlers
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const cityCoordinates = {
    'Edinburgh': [55.9533, -3.1883],
    'Tokyo': [35.6762, 139.6503],
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Singapore': [1.3521, 103.8198],
    'Sidney': [-33.8688, 151.2093]
};

const LocationsMap = ({ data }) => {
    // Extract unique cities and count employees
    const cityCounts = {};
    data.forEach(emp => {
        const city = emp[2];
        cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '2rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Employee Locations</h2>
            <div style={{ flex: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {Object.entries(cityCounts).map(([city, count]) => {
                        const coords = cityCoordinates[city];
                        if (!coords) return null;
                        return (
                            <Marker key={city} position={coords}>
                                <Popup>
                                    <div style={{ color: '#000' }}>
                                        <strong>{city}</strong><br />
                                        {count} Employee{count > 1 ? 's' : ''}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default LocationsMap;
