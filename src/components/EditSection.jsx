import React from 'react'
import { getSectionToEdit, updateTopStory, addFeatured, removeFeatured } from '../services/ApiMethods.js'
import { withRouter } from 'react-router-dom';
import '../styles/EditSection.css'
import Articles from './shared/Articles.jsx'

class EditSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            section: {},
            feature_ids: [],
            all: true
        }
    }

    componentDidMount = async () => {
        this.setSection(this.props.match.params.id);
    }

    setSection = async (id) => {
        const section = await getSectionToEdit(id);
        const feature_ids = section.features.map(feature => feature.article_id)
        this.setState({
            section: section,
            feature_ids: feature_ids
        })
    }

    topToggle = async (id) => {
        const newSectionInfo = await updateTopStory(this.props.match.params.id, id)
        this.setSection(this.props.match.params.id);
    }

    featureToggle = async (id) => {
        if (this.state.section.top_story == id) {
            return false
        }
        if (!this.state.feature_ids.includes(id)) {
            await addFeatured(this.props.match.params.id, id);
        } else {
            const feature_id = this.state.section.features.filter(feature => feature.article_id == id)[0].id;
            await removeFeatured(feature_id);
        }
        this.setSection(this.props.match.params.id);
    }

    allToggle = (bool) => {
        if (bool != this.state.all) {
            this.setState(state => ({ all: !state.all }))
        }
    }

    render() {

        const sectionSelect = this.props.magazine && this.props.magazine.sections && this.props.magazine.sections.map((section, index) => <option key={index} value={section.id}>{section.title}</option>)

        return (
            <div className="sectionPage">
                <div className="sectionEdit">
                    <div className="sectionLeft">
                        <h2><span className="thin">Section: </span>{this.state.section ? this.state.section.title : null }</h2>
                        <div>
                            View articles: 
                            <button className={this.state.all && `on`} onClick={() => this.allToggle(true)}>All</button>
                            <button className={this.state.all || `on`} onClick={() => this.allToggle(false)}>Featured Only</button></div>
                    </div>
                    <div className="sectionRight">
                        <div>
                            <label for="section">Choose a section:</label>
                            <select name="section" value={this.props.match.params.id} onChange={(e) => {
                                this.props.history.push(`/edit/sections/${e.target.value}`);
                                this.setSection(e.target.value);
                             }} >
                                {sectionSelect}
                            </select>
                        </div>
                        <input type="search" placeholder={`Search within ${this.state.section ? this.state.section.title : null }`}></input>
                    </div>
                </div>
                <Articles 
                    sectionId={this.props.match.params.id}
                    articles={this.state.section && this.state.all ? 
                        this.state.section.article_list :
                        this.state.section.article_list.filter(article => article.id == this.state.section.top_story || this.state.feature_ids.includes(article.id))
                    }
                    top_story={this.state.section && this.state.section.top_story}
                    feature_ids={this.state.section && this.state.feature_ids}
                    topToggle={this.topToggle}
                    featureToggle={this.featureToggle}
                />
            </div>

        )
    }
}

export default EditSection