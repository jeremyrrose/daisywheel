import React from 'react';
import { getPages, updateMagazine } from '../services/ApiMethods.js';
import Articles from './shared/Articles.jsx';
import '../styles/EditPages.css';

class EditPages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pages_order: [],
            pages: [],
            all: true
        }
    }

    componentDidMount () {
        this.setPages();
    }

    setPages = async () => {
        const resp = await getPages();
        console.log(resp)
        this.setState({
            pages: resp,
            pages_order: this.props.magazine.pages_order || []
        })
    }

    allToggle = (bool) => {
        if (bool != this.state.all) {
            this.setState(state => ({ all: !state.all }))
        }
    }

    switcher = async (id) => {
        let newArray = this.state.pages_order
        newArray.includes(id) ? newArray.splice(newArray.indexOf(id),1) : newArray.push(id)
        updateMagazine({pages_order: newArray})
        this.props.refresh()
    }

    render () {
        const selectedArray = 
            this.props.magazine 
            && this.state.pages_order 
            && this.state.pages.filter(page => this.state.pages_order.includes(page.id)).sort((a,b) => this.state.pages_order.indexOf(a.id) - this.state.pages_order.indexOf(b.id))

        const hiddenArray = 
            this.props.magazine 
            && this.state.pages_order 
            && this.state.pages.filter(page => !this.state.pages_order.includes(page.id))
        
        const selectedPages = 
            selectedArray.map((page,index) => {
            return (<button key={index} onClick={() => this.switcher(page.id)}>{page.title}</button>)
        })

        const hiddenPages = 
        hiddenArray.map((page,index) => {
        return (<button key={index} onClick={() => this.switcher(page.id)}>{page.title}</button>)
    })
        
        // return (
        //     <div className="editPages">
        //         <div className="selectedPages">
        //             <h2>Active Pages</h2>
        //             <p>(Click to hide.)</p>
        //             {selectedPages}
        //         </div>
        //         <div className="hiddenPages">
        //             <h2>Inactive Pages</h2>
        //             <p>(Click to activate.)</p>
        //             {hiddenPages}
        //         </div>
        //     </div>
        // )

        return (
            <div className="sectionPage">
                <div className="sectionEdit">
                    <div className="sectionLeft">
                        <h2><span className="thin">Section: </span>{this.state.section ? this.state.section.title : this.state.pages ? `Static Pages` : `Front Page` }</h2>
                        <div>
                            View articles: 
                            <button className={(this.state.all && `on`).toString()} onClick={() => this.allToggle(true)}>All</button>
                            <button className={(this.state.all || `on`).toString()} onClick={() => this.allToggle(false)}>{ this.state.pages ? `Menu Only` : `Featured Only` }</button></div>
                    </div>
                    <div className="sectionRight">
                        <input type="search" placeholder={`Search within ${this.state.section ? this.state.section.title : 'articles' }`}></input>
                    </div>
                </div>
                <Articles 
                    sectionId={this.props.match.params.id}
                    articles={this.state.pages && this.state.all ? 
                        this.state.pages :
                        this.state.pages.filter(article => article.id == this.state.top_story || this.state.pages_order.includes(article.id))
                    }
                    top_story={this.state.top_story}
                    feature_ids={this.state.pages_order}
                    topToggle={this.topToggle}
                    featureToggle={this.switcher}
                    refresh={this.props.refresh}
                />
                {/* <div class="offset">
                    {this.offset()}
                </div> */}
            </div>
        )
    }
}

export default EditPages