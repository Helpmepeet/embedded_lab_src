import React from 'react';
import { StaticGoogleMap, Marker } from 'react-static-google-map';


export function App(props) {
  var currentLocation = {lat: 0, lng: 0};
  var decibel = 100;
  var permit = true;

  const getBandColor = () => {
    if (decibel < 60) {
      return 'green';
    } else if (decibel >= 60 && decibel < 90) {
      return 'yellow';
    } else if (decibel >= 90 && decibel < 120) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  // band
  const bandStyle = {
    height: '10px',
    width: '200px',
    background: `linear-gradient(to right, 
              ${getBandColor()} ${decibel * 4/3}px, 
              transparent ${decibel * 4/3}px)`,
    borderRadius: '5px',
    position: 'relative',
  };

  const fetchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        currentLocation = {lat: latitude, lng: longitude};
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  fetchCurrentLocation();

  return (
    <div className="app-container">
      {/* Google Map */}
      <div className="top-half">
        <StaticGoogleMap
          apiKey="YOUR_GOOGLE_MAPS_API_KEY"
          size="600x300"
          scale={1}
        >
          <Marker location={{currentLocation}} />
        </StaticGoogleMap>
      </div>

      {/* Bottom half */}
      <div className="bottom-half">
        {/* box 1 */}
        <div className="square-box">
          <input
            type="text"
            placeholder={`Current Location: ${currentLocation.lat}, ${currentLocation.lng}`}
            readOnly
          />
        </div>

        {/* box 2 */}
        <div className={`square-box ${permit ? 'green' : 'red'}`}>
          <input
            type="text"
            value={permit ? 'Selling is allowed' : 'Selling is not permitted in this area.'}
            center
            readOnly
            style={{ backgroundColor: permit ? 'lightgreen' : '#ffcccc' }}
          />
        </div>

        {/* button */}
        <button className="circular-button">Button</button>
        
        {/* spectrum band */}
        <div className="spectrum-band">
          <div className="spectrum-band-title">Current volume level</div>
          <div className="spectrum-band-labels">
            <span>Quiet</span>
            <span>Too loud</span>
          </div>
          {/* bar */}
          <div className="indicator" style={bandStyle}></div>
        </div>
      </div>
    </div>
  );
}