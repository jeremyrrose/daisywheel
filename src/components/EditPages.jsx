import React from 'react';
import { getPages, updateMagazine } from '../services/ApiMethods.js'
import '../styles/EditPages.css';

class EditPages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pages_order: [],
            pages: []
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
        
        return (
            <div className="editPages">
                <div className="selectedPages">
                    <h2>Active Pages</h2>
                    <p>(Click to hide.)</p>
                    {selectedPages}
                </div>
                <div className="hiddenPages">
                    <h2>Inactive Pages</h2>
                    <p>(Click to activate.)</p>
                    {hiddenPages}
                </div>
            </div>
        )
    }
}

export default EditPages