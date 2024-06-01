// NavLink.js
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ activeClassName, ...props }) => {
  return (
    <RouterNavLink
      {...props}
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        return true;
      }}
      className={({ isActive }) => (isActive ? activeClassName : "")}
    />
  );
};

export default NavLink;
