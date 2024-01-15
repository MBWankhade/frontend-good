import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admins.css';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/admin/getAllAdmins`)
      .then((response) => response.json())
      .then((data) => {
        setAdmins(data.data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="admins-container">
      <div className="header">
        <h2>List of Admins</h2>
      </div>
      <ul className="admins-list">
        {admins.map((admin) => (
          <li key={admin._id} className="admin-item">
            <Link to={`/admins/${admin._id}/${admin.username}`} className="admin-link">
              {admin.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admins;
