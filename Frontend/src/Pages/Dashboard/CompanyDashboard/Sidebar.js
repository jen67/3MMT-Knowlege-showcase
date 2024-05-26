import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Our logo</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Payment</li>
          <li>Customers</li>
          <li>Messages</li>
          <li>Product</li>
          <li>Invoice</li>
          <li>Analytics</li>
          <li>Settings</li>
          <li>Security</li>
          <li>Help</li>
          <li>Log Out</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
