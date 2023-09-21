import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { getDeviceType, getBrowserName, getOsName } from '../Components/Home_Component'
import './Home.css'
import SimpleMap from '../Components/SimpleMap';
import { useAuth } from '../Components/AuthContext';

const Home = () => {

  const { isLoggedIn } = useAuth();

  const deviceName = getDeviceType();

  const browserName = getBrowserName();

  const osName = getOsName();

  const [ipAddress, setIpAddress] = useState('');


  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        setIpAddress('Error fetching IP');
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className='home-container-1'>
      <div className="home-container-2">
        <div className="home-container-item">
          <h3 className='item-1'>Device Name</h3>
          {
            isLoggedIn ?
              <p className='item-output-1'>{deviceName}</p>
              :
              <p className='item-output-1' >null</p>

          }
        </div>

        <div className="home-container-item">
          <h3 className='item-2'>Browser Name</h3>
          {
            isLoggedIn ?
              <p className='item-output-2'>{browserName}</p>
              :
              <p className='item-output-2' >null</p>

          }
        </div>

        <div className="home-container-item">
          <h3 className='item-3'>OS Used</h3>
          {
            isLoggedIn ?
              <p className='item-output-3'>{osName}</p>
              :
              <p className='item-output-3' >null</p>
          }
        </div>

        <div className="home-container-item">
          <h3 className='item-4'>IP Address</h3>
          {
            isLoggedIn ?
              <button className='item-output-4'>{ipAddress}</button>
              :
              <p className='item-output-4' style={{ marginLeft: "15px" }}>null</p>
          }
        </div>

        <div className="home-container-item">
          <h3 className='item-5'>Login History</h3>
          <Link to='./LoginHistory'><button className='item-output-5'>Show History</button></Link>
        </div>
      </div>

      <div className="mapscontainer">
        <SimpleMap />
      </div>

       <div className="footer">
        &copy; 2023 Copyright
      </div>
    </div>
  )
}

export default Home
