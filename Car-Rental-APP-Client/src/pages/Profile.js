// frontend/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css'
import DefaultLayout from '../components/DefaultLayout';
import Footer from './Footer';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id
        const { data } = await axios.post('http://localhost:2000/api/profile', {
          userId: userId
        });
        const blob = new Blob([data.image], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl)
        setUser(data);
      } catch (error) {
        console.log(error)
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <DefaultLayout>
    <div className="user-profile-container">
      <div className="user-profile-popup">
        <div className="user-profile-header">
          <h2>{user.username}</h2>
        </div>
        <div className="user-profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Pincode:</strong> {user.pincode}</p>
          <p><strong>License:</strong> {user.license}</p>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </DefaultLayout>
    
  );
};

export default Profile;
