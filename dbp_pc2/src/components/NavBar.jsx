import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const NavBar = () => {
    const {token, logout} = useAuth();

    return (
    <nav>
        <ul className="navbar-list">
            <li>
                <Link to='/'>Home</Link>
            </li>
            {!token ?(
            <>
            <li>
                <Link to='/login'>Login</Link>  
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            </>
            ): (
            <>
                <li> 
                    <Link to='/productos'>Productos</Link>
                </li>
            </>
            )}
        </ul>
    </nav>
  );
};

export default NavBar;