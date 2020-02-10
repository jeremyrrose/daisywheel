import React from 'react';
import { getArticlesToEdit } from '../../services/ApiMethods.js'
import ArticleCard from './ArticleCard.jsx'
import '../../styles/Articles.css'

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.setArticles();
    }

    setArticles = async () => {
        // const articles = await getArticlesToEdit(this.props.section_id);
        // this.setState({
        //     articles: articles
        // })
    }

    articleCards = () => {
        return this.props.articles && this.props.articles.map((article, index) => {
            return (<ArticleCard
                key={index}
                isTop={this.props.top_story === article.id}
                featured={this.props.feature_ids.includes(article.id)}
                sectionId={article.section_id}
                articleId={article.id}
                image_url={article.image_url}
                title={article.title}
                dek={article.dek}
                author={article.author ? article.author.name : `Staff`}
                date={article.created_at}
                published={article.published}
                topToggle={this.props.topToggle}
                featureToggle={this.props.featureToggle}
                refresh={this.props.refresh}
                modalToggler={this.props.modalToggler}
                />)
        });
    }

    render() {


        return (
            <div className="articleList">
                {this.articleCards()}
            </div>
        )
    }
}

export default Articles