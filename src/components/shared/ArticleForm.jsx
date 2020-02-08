import React from 'react';
import ImageUploader from 'react-images-upload';
import '../../styles/ArticleForm.css'
import checkMark from '../../images/checkMark.svg'

const ArticleForm = ({
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
    sections,
    author_id,
    authors,
    onChange,
    toggle,
    onSubmit,
    onDrop,
    photoDisplay,
    image_url,
    wysiwygHandler
}) => {

    const underlineButton = document.getElementsByName('underline')[0];
    const boldButton = document.getElementsByName('bold')[0];
    const italicButton = document.getElementsByName('italic')[0];
    // document.execCommand("defaultParagraphSeparator", false, "p"); // use if we want p tags in the article body

    const header = id ? <h2>Edit Article</h2> : <h2>New Article</h2>
    const sectionSelect = sections && sections.map((section, index) => <option key={index} value={section.id}>{section.title}</option>)
    const authorSelect = authors && authors.map((author, index) => <option key={index} value={author.id}>{author.name}</option>)
    const styler = (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.target.name)
        document.execCommand(`${e.target.name}`, false, null);
        e.nativeEvent.target.classList.toggle('on');
        buttonState();
    }

    const linker = (e, name, arg) => {
        e.preventDefault();
        console.log(window.getSelection().anchorNode.parentNode.toString())
        if (window.getSelection().anchorNode.parentNode.tagName == 'A' ) {
            console.log('link')
            document.execCommand('unlink', false, null);
        } else {
            let url = prompt('Enter a URL', 'http://')
            document.execCommand('createLink', false, url);
        }
    }

    const buttonState = () => {
        document.queryCommandState('italic') ? italicButton.className = "on" : italicButton.className="";
        document.queryCommandState('bold') ? boldButton.className = "on" : boldButton.className="";
        document.queryCommandState('underline') ? underlineButton.className = "on" : underlineButton.className="";
    }

    const heroHolder = image_url ?         
        <>
        <div className="articleCardImage">
            <img src={image_url} className="uploadPicture" />
        </div>           
        <button type="button" name="changePhoto" onClick={(e) => photoDisplay(e)}>Change photo</button> </> : 
        <ImageUploader
        withPreview={true}
        buttonText='Choose an image file'
        onChange={e => onDrop(e)}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        />

    return(
        <form className="articleForm" onSubmit={e => onSubmit(e)} >
            <div className="row1">
                {header}
                <div>
                    <label for="section_id">Section</label>
                    <select name="section_id" value={section_id} onChange={(e) => onChange(e)} >
                        {sectionSelect}
                        <option value={0}>:: Static Page</option>
                    </select>
                </div>
            </div>
            <div className="wideInput">
                <label for="title">Article title</label>
                <input name="title" type="text" value={title} onChange={(e) => onChange(e)} />
            </div>
            <div className="wideInput">
                <label for="dek">Dek</label>
                <input name="dek" type="text" value={dek} onChange={(e) => onChange(e)} />
            </div>
            <div className="row4">
                <div>
                    <label for="author_id">Author</label>
                    <select name="author_id" value={author_id} onChange={(e) => onChange(e)}>
                        <option value="0">:: Staff</option>
                        {authorSelect}
                    </select>
                </div>
                <input name="updated_at" type="text" value={updated_at} onChange={(e) => onChange(e)} />
            </div>
            <div className="heroRow">
                <div className="heroLeft">
                    <label>Hero image</label>
                    {heroHolder}
                </div>
                <div className="heroColumn">
                    <div>
                        <label for="caption">Photo caption</label>
                        <input name="caption" type="text" value={caption} onChange={(e) => onChange(e)} />
                    </div>
                    <div>
                        <label for="credit">Photo credit</label>
                        <input name="credit" type="text" value={credit} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            </div>
            <div>
                <div className="wysiwygControls">
                    <button type="button" name="bold" onClick={(e) => styler(e)}><span><b>B</b></span></button>
                    <button type="button" name="italic" onClick={(e) => styler(e)}><span><i>i</i></span></button>
                    <button type="button" name="underline" onClick={(e) => styler(e)}><span><u>u</u></span></button>
                    <button type="button" name="link" onClick={(e) => linker(e)}><span>link</span></button>
                </div>
                <div>
                <label for="content">Article body</label>
                <div id="content" contentEditable="true" onClick={() => buttonState()} onBlur={() => wysiwygHandler('content')} dangerouslySetInnerHTML={{__html: content}} />
                </div>
            </div>
            <div className="submitRow">
                <button name="draft" className={published ? null : 'checkOn'} onClick={(e) => toggle(e,'draft')}>Draft <img src={checkMark} /></button>
                <button name="publish" className={published ? 'checkOn' : null} onClick={(e) => toggle(e, 'publish')}>Publish <img src={checkMark} /></button>
                <input type="submit" />
            </div>

        </form>
    )
}

export default ArticleForm;