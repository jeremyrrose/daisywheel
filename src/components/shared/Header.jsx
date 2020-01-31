import React from 'react';
import { getMagazine } from '../../services/ApiMethods.js'
import '../../styles/Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {
    }

    render () {
        return (
            <header>
                <h1>{this.props.magazine.title}</h1>
                <h5>powered by daisywheel v. 0.1</h5>
            </header>
        )
    }
}

export default Header;