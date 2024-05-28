import React, { useState, useEffect } from 'react';
import CompanySidebar from "./CompanyDashboard/Sidebar/CompanySidebar.js"; 
import TalentSidebar from './TalentDashboard/Sidebar/TalentSidebar';
import "./withSidebar.css"
import { FiMenu, FiX } from 'react-icons/fi';

const withCompanySidebar = (Component) => {
  return (props) => {
    const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

    useEffect(() => {
      const handleResize = () => {
        setSidebarVisible(window.innerWidth > 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div className="dashboard">
        {isSidebarVisible && <CompanySidebar className={isSidebarVisible ? 'visible' : ''} />}
        <div className="main-content">
          <button onClick={() => setSidebarVisible(!isSidebarVisible)} className="sidebar-control">
            {isSidebarVisible ? <><FiX /> Hide Sidebar</> : <><FiMenu /> Show Sidebar</>}
          </button>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

const withTalentSidebar = (Component) => {
  return (props) => {
    const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

    useEffect(() => {
      const handleResize = () => {
        setSidebarVisible(window.innerWidth > 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div className="dashboard">
        {isSidebarVisible && (
          <TalentSidebar className={isSidebarVisible ? "visible" : ""} />
        )}
        <div className="main-content">
          <button
            onClick={() => setSidebarVisible(!isSidebarVisible)}
            className="sidebar-control"
          >
            {isSidebarVisible ? (
              <>
                <FiX /> Hide Sidebar
              </>
            ) : (
              <>
                <FiMenu /> Show Sidebar
              </>
            )}
          </button>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export { withCompanySidebar, withTalentSidebar };