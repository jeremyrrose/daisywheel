import React from 'react';
import { Link } from 'react-router-dom';
import checkMark from '../../images/checkMark.svg'
import '../../styles/ArticleCard.css'

const ArticleCard = ({image_url, title, dek, author, date, articleId, published, isTop, featured, topToggle, featureToggle}) => {
    const toggleButtons = (<>
        <button className={`top${isTop ? " on" : ""}`} onClick={() => topToggle(articleId)}>Top Story <img src={checkMark} /></button>
        <button className={`featured${featured ? " on" : ""}`} onClick={() => featureToggle(articleId)}>Featured <img src={checkMark} /></button>
        </>)

    return (
        <div className="articleCard">
            <div className="articleCardImage">
                <img src={image_url} />
            </div>
            <div className="articleCardInfo">
                <h3>{title}</h3>
                <p className="dek">{dek}</p>
                <p className="authorDate">{author} :: {date}</p>
            </div>
            <div className="cardControls">
                <p>{published ? 'Published' : 'Draft' }</p>
                { published && toggleButtons }
                <Link to={`/edit/articles/${articleId}`}><button>Edit</button></Link>
            </div>
        </div>
    )
}

export default ArticleCard;