import React from 'react'
import { getArticlesToEdit, getFeatures, addFeatured, removeFeatured, updateMagazine } from '../services/ApiMethods.js'
import Articles from './shared/Articles.jsx'

class EditArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            features: [],
            feature_ids: [],
            top_story: null,
            all: true
        }
    }

    componentDidMount() {
        this.setArticles();
    }

    setArticles = async () => {
        const articles = await getArticlesToEdit(this.props.section_id);
        const features = await getFeatures();
        const feature_ids = features.map(feature => feature.article_id)
        this.setState({
            articles: articles,
            features: features,
            feature_ids: feature_ids,
            top_story: this.props.magazine.top_story
        })
    }

    allToggle = (bool) => {
        if (bool != this.state.all) {
            this.setState(state => ({ all: !state.all }))
        }
    }

    topToggle = async (id) => {
        const newSectionInfo = await updateMagazine({"top_story": id})
        this.setState({top_story: id});
        this.props.refresh();
    }

    featureToggle = async (id) => {
        if (this.state.top_story == id) {
            return false
        }
        if (!this.state.feature_ids.includes(id)) {
            await addFeatured(null, id);
        } else {
            const feature_id = this.state.features.filter(feature => feature.article_id == id)[0].id;
            await removeFeatured(feature_id);
        }
        this.setArticles();
    }

    render() {
        return (
        <div className="sectionPage">
            <div className="sectionEdit">
                <div className="sectionLeft">
                    <h2><span className="thin">Section: </span>{this.state.section ? this.state.section.title : `Front Page` }</h2>
                    <div>
                        View articles: 
                        <button className={this.state.all && `on`} onClick={() => this.allToggle(true)}>All</button>
                        <button className={this.state.all || `on`} onClick={() => this.allToggle(false)}>Featured Only</button></div>
                </div>
                <div className="sectionRight">
                    <input type="search" placeholder={`Search within ${this.state.section ? this.state.section.title : 'articles' }`}></input>
                </div>
            </div>
            <Articles 
                sectionId={this.props.match.params.id}
                articles={this.state.articles && this.state.all ? 
                    this.state.articles :
                    this.state.articles.filter(article => article.id == this.state.top_story || this.state.feature_ids.includes(article.id))
                }
                top_story={this.state.top_story}
                feature_ids={this.state.feature_ids}
                topToggle={this.topToggle}
                featureToggle={this.featureToggle}
            />
        </div>
        )
    }
}

export default EditArticles;