import React, { useEffect, useState } from "react";
import { useAuth } from './AuthContext';

export default function MapWithLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  return (
    <div>
      {latitude !== null && longitude !== null && (
        isLoggedIn ?
          <iframe
            title="User Location"
            width="99.5%"
            height="530px"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          ></iframe>
          :
          <span></span>
          

      )}
    </div>
  );
}
