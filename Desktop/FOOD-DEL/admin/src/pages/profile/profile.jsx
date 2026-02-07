import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="profile-img"
          />
          <h3 className="profile-name">Pawan Yadav</h3>
          <p className="profile-role">Admin</p>
        </div>

        <div className="profile-right">
          <form className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="Pawan Yadav" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue="pawan@example.com" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" defaultValue="+91 9876543210" />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" defaultValue="New Delhi, India" />
            </div>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
