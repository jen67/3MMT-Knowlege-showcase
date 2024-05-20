// NavLink.js
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ exact, activeClassName, ...props }) => {
  return (
    <RouterNavLink 
      {...props} 
      end={exact} 
      className={({ isActive }) => isActive ? activeClassName : ''}
    />
  );
}

export default NavLink;