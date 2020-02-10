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
                <h5>{this.props.magazine.description}</h5>
            </header>
        )
    }
}

export default Header;