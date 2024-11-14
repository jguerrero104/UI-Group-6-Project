// src/components/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
