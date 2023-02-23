import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex items-center justify-between border-1 border-b my-5 p-5">
      <div className="logo text-3xl font-bold">
        <Link to="/">Azumo</Link>
      </div>
    </div>
  );
};

export default Navbar;
