import React, { useState } from 'react';
import CompanySidebar from "./CompanyDashboard/Sidebar/CompanySidebar.js"; 
import TalentSidebar from './TalentDashboard/Sidebar/TalentSidebar';
import "./withSidebar.css"

const withCompanySidebar = (Component) => {
  return (props) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    return (
      <div className="dashboard">
        {isSidebarVisible && <CompanySidebar className={isSidebarVisible ? 'visible' : ''} />}
        <div className="main-content">
          <button onClick={() => setSidebarVisible(!isSidebarVisible)}>
            {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

const withTalentSidebar = (Component) => {
  return (props) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    return (
      <div className="dashboard">
        {isSidebarVisible && <TalentSidebar className={isSidebarVisible ? 'visible' : ''} />}
        <div className="main-content">
          <button onClick={() => setSidebarVisible(!isSidebarVisible)}>
            {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export { withCompanySidebar, withTalentSidebar };