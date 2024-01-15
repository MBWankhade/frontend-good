import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dates.css'; // Import a CSS file for styling

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Alldates = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/admin/getAllDates`)
      .then((response) => response.json())
      .then((data) => setDates(data.data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="dates-container">
      <h2>List of All Dates</h2>
      <ul className="dates-list">
        {dates.map((date) => (
          <li key={date} className="date-item">
            <Link to={`/admins/Alldates/${date}`} className="date-link">
              {date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alldates;
