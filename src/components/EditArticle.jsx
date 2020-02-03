import React from 'react';
import ArticleForm from './shared/ArticleForm.jsx';
import { updateArticle, getArticle } from '../services/ApiMethods.js'

class EditArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = async () => {
        this.getArticleToEdit(this.props.match.params.id);
      }
    
    getArticleToEdit = async (id) => {
        getArticle(id)
        .then(({ 
            article: {
                id,
                title,
                dek,
                content,
                caption,
                credit,
                url,
                published,
                updated_at,
                section_id,
                author_id,
            }, 
            image_url
        }) => this.setState({
                id,
                title,
                dek,
                content,
                caption,
                credit,
                url,
                published,
                updated_at,
                section_id,
                author_id,
                image_url
            }))
      }
      
    changeHandler = (e) => {
          this.setState({ [e.target.name]: e.target.value })
      }

    toggler = (e, componentName) => {
        e.preventDefault();
        if ( componentName === 'draft' && this.state.published === true ) {
            this.setState({published: false});
        }
        if ( componentName === 'publish' && this.state.published === false ) {
            this.setState({published: true});
        }
    }

    wysiwygHandler = (name) => {
        const elem = document.getElementById(`${name}`)
        this.setState({ [name]: elem.innerHTML })
    }

    onDrop = (picture) => {
        console.log(picture)
        this.setState({
            image: picture[0]
        })
    }

    photoDisplay = (e) => {
        e.preventDefault();
        console.log(e)
        this.setState({image_url: null});
    }

    buildArticle = (e) => {
        e.preventDefault();
        // const articleData = {
        //     title: this.state.title,
        //     dek: this.state.dek,
        //     content: this.state.content,
        //     image: this.state.picture && this.state.picture[0],
        //     // caption: this.state.caption,
        //     // credit: this.state.credit,
        //     // url: this.state.url,
        //     published: this.state.published,
        //     // updated_at: this.state.updated_at,
        //     section_id: this.state.section_id,
        //     author_id: this.state.author_id
        // }
        const stateInfo = {...this.state};
        console.log(stateInfo);
        let articleData = new FormData();
        for(var name in stateInfo){
            stateInfo[name] && articleData.append(name, stateInfo[name]);
        }
        updateArticle(this.props.match.params.id, articleData)
        .then(this.props.history.push('/edit/articles'));
    }

    render () {
        const {
            id,
            title,
            dek,
            content,
            image,
            caption,
            credit,
            url,
            published,
            updated_at,
            section_id,
            author_id
        } = this.state;
        return (
            <ArticleForm             
                id={id}
                title={title}
                dek={dek}
                content={content}
                image={image}
                caption={caption}
                credit={credit}
                url={url}
                published={published}
                updated_at={updated_at}
                section_id={section_id}
                sections={this.props.magazine.sections}
                author_id={author_id}
                onChange={this.changeHandler}
                toggle={this.toggler}
                onSubmit={this.buildArticle}
                onDrop={this.onDrop}
                photoDisplay={this.photoDisplay}
                wysiwygHandler={this.wysiwygHandler}
                image_url={this.state.image_url && this.state.image_url}
            />
        )
    }
}

export default EditArticle;