import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex items-center justify-between border-1 border-b my-5 p-5">
      <div className="logo text-3xl font-bold">
        <Link to="/">Proxima</Link>
      </div>
      <ul className="links uppercase flex gap-5">
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
