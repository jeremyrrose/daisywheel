import React from 'react'
import { updateMagazine } from '../services/ApiMethods.js'
import '../styles/Configuration.css'

class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color_1: this.props.magazine.color_1,
            color_2: this.props.magazine.color_2,
            color_3: this.props.magazine.color_3,
            color_4: this.props.magazine.color_4
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeColors = (e) => {
        e.preventDefault();
        updateMagazine(this.state);
        this.addColors();
    }

    addColors = () => {
        const styleSet = document.documentElement.style;
        styleSet.setProperty("--primary-color", this.state.color_1);
        styleSet.setProperty("--soft-primary-color", this.state.color_2);
        styleSet.setProperty("--secondary-color", this.state.color_3);
        styleSet.setProperty("--highlight-color", this.state.color_4);
      }

    usePalette = (e, colors) => {
        e.preventDefault();
        this.setState({
            color_1: colors[0],
            color_2: colors[1],
            color_3: colors[2],
            color_4: colors[3]
        })
    }

    render () {
        return (
            <div className="configuration">
                <form className="customColors" name="colors" onSubmit={(e) => this.changeColors(e)}>
                    <h3>Click a color to change it</h3>
                    <div>            
                        <input type="color" name="color_1" value={this.state.color_1} onChange={(e) => this.changeHandler(e)}></input>
                        <p>: Primary color</p>
                    </div>
                    <div>            
                        <input type="color" name="color_2" value={this.state.color_2} onChange={(e) => this.changeHandler(e)}></input>
                        <p>: Muted primary color</p>
                    </div> 
                    <div>           
                        <input type="color" name="color_3" value={this.state.color_3} onChange={(e) => this.changeHandler(e)}></input> 
                        <p>: Secondary color</p>
                    </div>  
                    <div>         
                        <input type="color" name="color_4" value={this.state.color_4} onChange={(e) => this.changeHandler(e)}></input>
                        <p>: Highlight color</p>
                    </div>
                    <button type="submit">Set colors</button>
                </form>

                <div className="palettes">
                    <h3>...or choose from a palette</h3>
                    <button type="button" onClick={(e) => this.usePalette(e, [
                        this.props.magazine.color_1,
                        this.props.magazine.color_2,
                        this.props.magazine.color_3,
                        this.props.magazine.color_4
                    ])}>
                        Revert to previous &nbsp; &nbsp; 
                        <div style={{backgroundColor: this.props.magazine.color_1}}></div>
                        <div style={{backgroundColor: this.props.magazine.color_2}}></div>
                        <div style={{backgroundColor: this.props.magazine.color_3}}></div>
                        <div style={{backgroundColor: this.props.magazine.color_4}}></div>
                    </button>
                    <button type="button" onClick={(e) => this.usePalette(e, ['#107595','#626289','#fdbfb3','#fcf594'])}>MoDA &nbsp; &nbsp; 
                        <div style={{backgroundColor: '#107595'}}></div>
                        <div style={{backgroundColor: '#626289'}}></div>
                        <div style={{backgroundColor: '#fdbfb3'}}></div>
                        <div style={{backgroundColor: '#fcf594'}}></div>
                    </button>
                    <button type="button" onClick={(e) => this.usePalette(e, ["#576490","#A3BCF9","#343E3D","#7796CB"])}>Mute blue &nbsp; &nbsp; 
                        <div style={{backgroundColor: '#576490'}}></div>
                        <div style={{backgroundColor: '#A3BCF9'}}></div>
                        <div style={{backgroundColor: '#343E3D'}}></div>
                        <div style={{backgroundColor: '#7796CB'}}></div>
                    </button>
                    <button type="button" onClick={(e) => this.usePalette(e, ["#C56DFF","#FAA6FF","#2F195F","#4DCFCB"])}>Jazzercise &nbsp; &nbsp; 
                        <div style={{backgroundColor: '#C56DFF'}}></div>
                        <div style={{backgroundColor: '#FAA6FF'}}></div>
                        <div style={{backgroundColor: '#2F195F'}}></div>
                        <div style={{backgroundColor: '#4DCFCB'}}></div>
                    </button>
                    <button type="button" onClick={(e) => this.usePalette(e, ["#DDFFDD","#F4F9F9","#E3E8E8","#E993AA"])}>Neopolitan &nbsp; &nbsp; 
                        <div style={{backgroundColor: '#DDFFDD'}}></div>
                        <div style={{backgroundColor: '#F4F9F9'}}></div>
                        <div style={{backgroundColor: '#E3E8E8'}}></div>
                        <div style={{backgroundColor: '#E993AA'}}></div>
                    </button>
                    <button type="button" onClick={(e) => this.usePalette(e, ["#523F70","#D1C8E1","#222251","#98C1D9"])}>daisywheel basic &nbsp; &nbsp; 
                        <div style={{backgroundColor: '#523F70'}}></div>
                        <div style={{backgroundColor: '#D1C8E1'}}></div>
                        <div style={{backgroundColor: '#222251'}}></div>
                        <div style={{backgroundColor: '#98C1D9'}}></div>
                    </button>
                </div>
            </div>
        )
    }
}

export default Configuration