import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";


const Navbar = () => {
  const { user } = useAuthContext();
  const {logout} = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <div className="navbar flex items-center justify-between border-1 border-b my-5 p-5">
      <div className="logo text-3xl font-bold">
        <Link to="/">Proxima</Link>
      </div>
      <div>
        {!user && (
          <ul className="links uppercase flex gap-5">
            <li>
              <Link to="/signup">signup</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        )}
        {user && (
          <div className="links uppercase flex gap-5">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="uppercase">logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
