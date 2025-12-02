import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import citiesData from '../data/cities.json'
import routesData from '../data/routes.json'
import weatherData from '../data/weather.json'
import './MapComponent.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icon for cities
const createCityIcon = (type) => {
  const color = type === 'destination' ? '#8B4513' : type === 'source' ? '#654321' : '#A0522D'
  return L.divIcon({
    className: 'custom-city-marker',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #3d2817;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

// Component to handle map bounds
function MapBounds() {
  const map = useMap()
  useEffect(() => {
    map.fitBounds([
      [28, 14],
      [46, 36]
    ], { padding: [50, 50] })
  }, [map])
  return null
}

// Component for curved polylines
function CurvedPolyline({ positions, color, description }) {
  const [hovered, setHovered] = useState(false)
  
  // Create smooth curved path using quadratic bezier approximation
  const curvedPositions = []
  if (positions.length >= 2) {
    for (let i = 0; i < positions.length - 1; i++) {
      const start = positions[i]
      const end = positions[i + 1]
      
      // Calculate midpoint
      const midLat = (start[0] + end[0]) / 2
      const midLng = (start[1] + end[1]) / 2
      
      // Create curve perpendicular to the line (maritime routes curve naturally)
      const dx = end[1] - start[1]
      const dy = end[0] - start[0]
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      let perpLat = midLat
      let perpLng = midLng
      
      if (distance > 0.001) { // Avoid division by zero
        const curveAmount = Math.min(distance * 0.3, 1.0) // Limit curve amount
        // Perpendicular offset for natural maritime curve
        perpLat = midLat + (dx / distance) * curveAmount * 0.5
        perpLng = midLng - (dy / distance) * curveAmount * 0.5
      }
      
      if (i === 0) {
        curvedPositions.push(start)
      }
      curvedPositions.push([perpLat, perpLng])
      if (i === positions.length - 2) {
        curvedPositions.push(end)
      }
    }
  } else {
    curvedPositions.push(...positions)
  }

  return (
    <Polyline
      positions={curvedPositions}
      pathOptions={{
        color: color,
        weight: hovered ? 4 : 2,
        opacity: 0.7,
        dashArray: '10, 5'
      }}
      eventHandlers={{
        mouseover: () => setHovered(true),
        mouseout: () => setHovered(false),
        click: () => {
          alert(description)
        }
      }}
    />
  )
}

// Component for wind arrows with arrowheads
function WindArrow({ start, end, strength }) {
  const arrowColor = strength === 'strong' ? '#2E5090' : '#5A7BA7'
  const arrowWeight = strength === 'strong' ? 3 : 2
  
  // Calculate arrowhead
  const angle = Math.atan2(end[0] - start[0], end[1] - start[1])
  const arrowLength = 0.3
  const arrowAngle = Math.PI / 6
  
  const arrowHead1 = [
    end[0] - arrowLength * Math.cos(angle - arrowAngle),
    end[1] - arrowLength * Math.sin(angle - arrowAngle)
  ]
  const arrowHead2 = [
    end[0] - arrowLength * Math.cos(angle + arrowAngle),
    end[1] - arrowLength * Math.sin(angle + arrowAngle)
  ]
  
  return (
    <>
      <Polyline
        positions={[start, end]}
        pathOptions={{
          color: arrowColor,
          weight: arrowWeight,
          opacity: 0.6
        }}
      />
      <Polyline
        positions={[end, arrowHead1]}
        pathOptions={{
          color: arrowColor,
          weight: arrowWeight,
          opacity: 0.6
        }}
      />
      <Polyline
        positions={[end, arrowHead2]}
        pathOptions={{
          color: arrowColor,
          weight: arrowWeight,
          opacity: 0.6
        }}
      />
    </>
  )
}

function MapComponent() {
  const [showNileFlood, setShowNileFlood] = useState(true)
  const [showMethana, setShowMethana] = useState(true)
  const [showOkmok, setShowOkmok] = useState(true)
  const [showEtesianWinds, setShowEtesianWinds] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [hoveredCity, setHoveredCity] = useState(null)

  const routeColors = {
    'egypt-athens': '#8B4513',
    'black-sea-athens': '#654321',
    'sicily-athens': '#A0522D',
    'cyrene-athens': '#CD853F',
    'phoenicia-athens': '#D2691E'
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[37.0, 25.0]}
        zoom={6}
        style={{ height: '100vh', width: '100%' }}
        className="ancient-map"
      >
        <MapBounds />
        
        {/* Custom parchment-style tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="parchment-tiles"
        />

        {/* Grain Routes */}
        {showRoutes && routesData.map(route => {
          const sourceCity = citiesData.find(c => c.id === route.source)
          const destCity = citiesData.find(c => c.id === route.destination)
          if (!sourceCity || !destCity) return null
          
          const positions = route.waypoints || [
            [sourceCity.lat, sourceCity.lng],
            [destCity.lat, destCity.lng]
          ]
          
          return (
            <CurvedPolyline
              key={route.id}
              positions={positions}
              color={routeColors[route.id] || '#8B4513'}
              description={route.description}
            />
          )
        })}

        {/* City Markers */}
        {citiesData.map(city => (
          <Marker
            key={city.id}
            position={[city.lat, city.lng]}
            icon={createCityIcon(city.type)}
            eventHandlers={{
              mouseover: () => setHoveredCity(city.id),
              mouseout: () => setHoveredCity(null)
            }}
          >
            <Popup className="city-popup">
              <div className="popup-content">
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                {city.grainPrice && (
                  <p className="grain-price">
                    <strong>Zenon Papyri Grain Price:</strong> {city.grainPrice} drachmas per medimnos
                  </p>
                )}
                {city.cropFailureRisk && (
                  <p className="crop-risk">
                    <strong>Crop Failure Risk:</strong> {city.cropFailureRisk}%
                  </p>
                )}
                <p className="weather-impact">
                  <em>Weather patterns significantly affect grain availability and shipping routes.</em>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Nile Flood Variability Marker */}
        {showNileFlood && (
          <CircleMarker
            center={[weatherData.nileFlood.lat, weatherData.nileFlood.lng]}
            radius={15}
            pathOptions={{
              color: '#1E90FF',
              fillColor: '#87CEEB',
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Popup>
              <div className="popup-content">
                <h3>{weatherData.nileFlood.name}</h3>
                <p>{weatherData.nileFlood.description}</p>
                <p><strong>Variability:</strong> {weatherData.nileFlood.variability}</p>
                <p><strong>Impact:</strong> {weatherData.nileFlood.impact}</p>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Methana Volcano Marker */}
        {showMethana && (
          <CircleMarker
            center={[weatherData.methanaVolcano.lat, weatherData.methanaVolcano.lng]}
            radius={12}
            pathOptions={{
              color: '#DC143C',
              fillColor: '#FF6347',
              fillOpacity: 0.7,
              weight: 2
            }}
          >
            <Popup>
              <div className="popup-content">
                <h3>{weatherData.methanaVolcano.name}</h3>
                <p>{weatherData.methanaVolcano.description}</p>
                <p><strong>Eruption:</strong> {weatherData.methanaVolcano.eruption}</p>
                <p><strong>Source:</strong> {weatherData.methanaVolcano.source}</p>
                <p><strong>Impact:</strong> {weatherData.methanaVolcano.impact}</p>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Okmok Volcanic Aerosol Marker */}
        {showOkmok && (
          <CircleMarker
            center={[weatherData.okmokVolcano.lat, weatherData.okmokVolcano.lng]}
            radius={20}
            pathOptions={{
              color: '#8B0000',
              fillColor: '#FF4500',
              fillOpacity: 0.5,
              weight: 3
            }}
          >
            <Popup>
              <div className="popup-content">
                <h3>{weatherData.okmokVolcano.name}</h3>
                <p>{weatherData.okmokVolcano.description}</p>
                <p><strong>Eruption:</strong> {weatherData.okmokVolcano.eruption}</p>
                <p><strong>Impact:</strong> {weatherData.okmokVolcano.impact}</p>
                <p><strong>Aerosol Effect:</strong> {weatherData.okmokVolcano.aerosol}</p>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Etesian Wind Arrows */}
        {showEtesianWinds && weatherData.etesianWinds.arrows.map((arrow, idx) => (
          <WindArrow
            key={`wind-${idx}`}
            start={arrow.start}
            end={arrow.end}
            strength={arrow.strength}
          />
        ))}
      </MapContainer>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="panel-header">
          <h2>Ancient Grain Trade & Weather</h2>
        </div>
        
        <div className="legend-section">
          <h3>Legend</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8B4513' }}></div>
            <span>Grain Routes</span>
          </div>
          <div className="legend-item">
            <div className="legend-color city-dest"></div>
            <span>Destination (Athens)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color city-source"></div>
            <span>Grain Sources</span>
          </div>
          <div className="legend-item">
            <div className="legend-color city-transit"></div>
            <span>Transit Points</span>
          </div>
        </div>

        <div className="weather-controls">
          <h3>Weather Layers</h3>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showNileFlood}
              onChange={(e) => setShowNileFlood(e.target.checked)}
            />
            <span>Nile Flood Variability</span>
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showMethana}
              onChange={(e) => setShowMethana(e.target.checked)}
            />
            <span>Methana Volcano (Thucydides 3.89-90)</span>
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showOkmok}
              onChange={(e) => setShowOkmok(e.target.checked)}
            />
            <span>Okmok Volcanic Aerosol (43 BCE)</span>
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showEtesianWinds}
              onChange={(e) => setShowEtesianWinds(e.target.checked)}
            />
            <span>Etesian Winds (N→S)</span>
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
            />
            <span>Grain Routes</span>
          </label>
        </div>

        {hoveredCity && (
          <div className="tooltip">
            {citiesData.find(c => c.id === hoveredCity)?.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default MapComponent
