import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={assets.logo} alt="Logo" className="brand-logo" />
        <h2>MyWebsite</h2>
      </div>

      <div className="sidebar-options">
        <NavLink
          to='/add'
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to='/list'
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to='/order'
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink
          to='/profile'
          className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}
        >
          <img src={assets.profile_image} alt="" />
          <p>Profile</p>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <p>© 2025 MyWebsite</p>
      </div>
    </div>
  )
}

export default Sidebar