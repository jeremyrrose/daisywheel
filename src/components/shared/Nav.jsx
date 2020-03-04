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
            <div className="navText">
                <h3>Daisywheel CMS<br/>-- v. 0.7</h3>
                <p>: : <a href="http://github.com/jeremyrrose/daisywheel" target="_blank">GitHub repository</a></p>
                <p>: : <a href="http://jeremy-rose.com/moda" target="_blank">Live reader view</a><br/> &nbsp; &nbsp; (Moda template)</p>
                <p>: : <a href="http://jeremy-rose.com" target="_blank">jeremy-rose.com</a></p>
            </div>
        </div>
    )
}

export default Nav;