import React from 'react';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../../services/ApiMethods.js'
import checkMark from '../../images/checkMark.svg'
import '../../styles/ArticleCard.css'

const ArticleCard = ({image_url, title, dek, author, date, sectionId, articleId, published, isTop, featured, topToggle, featureToggle, refresh, modalToggler }) => {

    const deleteHandler = () => {
        deleteArticle(articleId)
        .then(modalToggler());
        return true;
    }

    const toggleButtons = (<>
        {sectionId ? (<button className={`top${isTop ? " on" : ""}`} onClick={() => topToggle(articleId)}>Top Story <img src={checkMark} /></button>) : null}
        <button className={`featured${featured ? " on" : ""}`} onClick={() => featureToggle(articleId)}>{ sectionId ? `Featured` : `Menu Item` } <img src={checkMark} /></button>
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
                <button style={{ width: "50px" }} onClick={(e) => modalToggler(e, deleteHandler, "delete this article") }> X </button>
            </div>
        </div>
    )
}

export default ArticleCard;