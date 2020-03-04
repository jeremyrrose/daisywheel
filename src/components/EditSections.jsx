import React from 'react';
import { Link } from 'react-router-dom';
import { addNewSection } from '../services/ApiMethods.js'
import '../styles/EditSections.css';

class EditSections extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newSection: false,
            sectionTitle: '',
            sectionShortTitle: ''
        }
    }

    addSection = async (e) => {
        e.preventDefault();
        if (await addNewSection({title: this.state.sectionTitle, short_title: this.state.sectionShortTitle})) {
            this.setState({
                    newSection: false,
                    sectionTitle: '',
                    sectionShortTitle: ''
                });
            this.props.refresh();
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render () {
        const sectionList = 
            this.props.magazine 
            && this.props.magazine.sections 
            && this.props.magazine.sections.map((section,index) => 
                <Link key={index} to={`/edit/sections/${section.id}`}>
                    <button>{section.title}</button>
                </Link>
            )
        
        const newSection =
            this.state.newSection ?
            <form className="newSection" onSubmit={(e) => this.addSection(e)}>
                <div>
                    <label htmlFor="sectionTitle">Section Title</label>
                    <input name="sectionTitle" type="text" onChange={this.changeHandler} value={this.state.sectionTitle} />
                </div>
                <div>
                    <label htmlFor="sectionShortTitle">Short Title for Menu Display</label>
                    <input name="sectionShortTitle" type="text" onChange={this.changeHandler} value={this.state.sectionShortTitle} />
                </div>
                <button className="addSection" type="submit">Add Section</button>
                <button className="cancelSection" type="button" onClick={() => this.setState({newSection: false, sectionTitle: '', sectionShortTitle: ''})}>Cancel</button>
            </form> :
            <button className="addSection" onClick={() => this.setState({newSection: true})}>+ Add a section</button>

        return (
            <div className="editSections">
                <h2>Choose a section to view articles:</h2>
                {sectionList}
                {newSection}
            </div>
        )
    }
}

export default EditSections