import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
function Header() {
  
  return (
    <div>
      <ul className="nav bg-black justify-content-end  p-3">
        
        <li className="nav-item m-2">
          <Link className="nav-link text-white" to="/">
            <FaHome size={30}/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
