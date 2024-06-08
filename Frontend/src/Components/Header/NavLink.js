// NavLink.js
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ exact, activeClassName, ...props }) => {
  return (
    <RouterNavLink
      {...props}
      exact="true" // `exact` is already a boolean, no need to double negate
      className={({ isActive }) =>
        isActive
          ? `${props.className} ${activeClassName}`.trim()
          : props.className
      }
    />
  );
};

export default NavLink;