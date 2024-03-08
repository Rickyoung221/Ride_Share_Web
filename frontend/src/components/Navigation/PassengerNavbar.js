import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../../services/mockAPI'; 
import '../../components/Navigation/PassengerNavbar.scss';
import Notification from "../Notification";
import { IconButton, Tooltip } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navigation() {
  const [userId, setUserId] = useState(null);
  const [searchValue, setSearchValue] = useState(''); // State to hold search input value
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user ID
    getCurrentUserId().then(setUserId);
  }, []);

  const handleSearchInputChange = (event) => {
    // Update search input value
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Redirect to search page with query
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  if (userId === null) {
    return <div>Loading...</div>; 
  }

  return (
    <nav className="p-navbar">
      <div className="p-navbar-brand">
        <Link to="/" className="p-navbar-logo">Swift Link</Link>
      </div>
      
      <div className="p-search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="p-navbar-nav">
        <li className="p-nav-item">
          <Tooltip title="Find a ride">
            <IconButton 
              aria-label="show all rides" 
              color="inherit" 
              onClick={() => navigate("/home")}>
              <DirectionsCarIcon />
            </IconButton>
          </Tooltip>
        </li>
        
        <li className="p-nav-item">
          <Notification />
        </li>

        <li className="p-nav-item">
          <Tooltip title="Account">
            <IconButton 
              aria-label="Profile" 
              color="inherit" 
              onClick={() => navigate(`/profile/${userId}`)}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </li>

      </ul>
    </nav>
  );
}

export default Navigation;