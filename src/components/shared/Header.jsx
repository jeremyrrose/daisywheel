import React from 'react';
import { getMagazine } from '../../services/ApiMethods.js'
import hamburger from '../../images/hamburger.svg';
import '../../styles/Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {
    }

    burgerClick = () => {
        const menu = document.querySelector('.leftNav');
        const burger = document.querySelector('.hamburger');
        menu.classList.toggle('expand');
        burger.classList.toggle('active');

        const hideMenu = () => {
            menu.classList.remove('expand');
            burger.classList.remove('active');
        }

        if (menu && !menu.classList.contains('set')) {
            menu.classList.add('set');
            const navArrows = menu.querySelectorAll('img');
            navArrows.forEach(arrow => {
                arrow.addEventListener('transitionend', hideMenu);
            })
        }
    }

    render () {
        return (
            <header>
                <div className="hamburger" onClick={this.burgerClick} >
                    <svg width="50" height="40" viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                        <rect width="50" height="9.565" rx="4.78261"/>
                        <rect y="15.6522" width="50" height="9.565" rx="4.78182"/>
                        <rect y="30.4348" width="50" height="9.565" rx="4.78261"/>
                    </svg>
                </div>
                <div>
                    <h1>{this.props.magazine.title}</h1>
                    <h5>{this.props.magazine.description}</h5>
                </div>
            </header>
        )
    }
}

export default Header;