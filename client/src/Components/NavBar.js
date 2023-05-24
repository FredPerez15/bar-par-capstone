import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return <nav className="nav">
        <ul>
            <li>
                <Link to='/ingredients'>ingredients</Link>
            </li>
            <li>
                <Link to='/recipes'>Recipes</Link>
            </li>
            <li>
                <Link to='/recipe_menu'>Menu</Link>
            </li>
            <li>
                <Link to='/home'>Home</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar;