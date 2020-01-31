import React from 'react';
import { NavLink } from 'react-router-dom';
import navArrow from '../../images/navArrow.svg';
import '../../styles/Nav.css'

const Nav = (props) => {
    return (
        <div className="leftNav">
            <NavLink
            to="/new/article" 
            activeClassName="selectedLink" >
                <button>Compose</button> <img src={navArrow} alt="" />
            </NavLink>

            <NavLink
            to="/edit/articles"
            activeClassName="selectedLink" >
                <button>Edit</button> <img src={navArrow} alt="" />
            </NavLink>

            <NavLink
            to="/edit/sections"
            activeClassName="selectedLink" >
                <button>Sections</button> <img src={navArrow} alt="" />
            </NavLink>

            <NavLink
            to="/edit/pages"
            activeClassName="selectedLink" >
                <button>Pages</button> <img src={navArrow} alt="" />
            </NavLink>

            <NavLink
            to="/edit/configuration"
            activeClassName="selectedLink" >
                <button>Configuration</button> <img src={navArrow} alt="" />
            </NavLink>

            {/* <NavLink
            to="/edit/users"
            activeClassName="selectedLink" >
                <button>Users</button> <img src={navArrow} alt="" />
            </NavLink> */}
        </div>
    )
}

export default Nav;