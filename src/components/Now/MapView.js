import React, { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup 
} from "react-simple-maps";

// USA map topojson data
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapView = ({ visitedPlaces }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  
  return (
    <div className="relative w-full h-[450px] rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#374151" // Dark gray for states
                  stroke="#1F2937" // Darker gray for borders
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#4B5563", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Place markers - updated to use theme's secondary color */}
          {visitedPlaces.map((place, index) => (
            <Marker 
              key={index} 
              coordinates={[place.coords[1], place.coords[0]]}
              onMouseEnter={() => {
                setActiveMarker(index);
                setTooltipContent(`${place.name}: ${place.description}`);
              }}
              onMouseLeave={() => {
                setActiveMarker(null);
                setTooltipContent("");
              }}
            >
              <g transform="translate(-12, -24)">
                <circle 
                  r={activeMarker === index ? 8 : 6}
                  className="fill-secondary transition-all duration-300"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
                {activeMarker === index && (
                  <circle 
                    r={12}
                    className="fill-secondary opacity-30 animate-ping"
                    stroke="none"
                  />
                )}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded shadow-lg">
          {tooltipContent}
        </div>
      )}
      
      {/* Legend - updated to use theme's secondary color */}
      <div className="absolute bottom-4 left-4 bg-gray-800/80 p-2 rounded text-xs text-white">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
          <span>Places I've visited</span>
        </div>
      </div>
      
      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-gray-600 text-xs">
        USA Map | Data from US Census
      </div>
    </div>
  );
};

export default MapView;
