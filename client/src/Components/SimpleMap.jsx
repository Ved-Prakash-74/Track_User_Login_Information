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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: "0.75" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27714393.089428417!2d77.0396393586936!3d32.01227949242396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1695307825757!5m2!1sen!2sin" 
              width="99.5%" 
              height="480px"
              title="Your Location">
            </iframe>
          </div>
      )}
    </div>
  );
}
