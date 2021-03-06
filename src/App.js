import React from 'react';
import './App.css';
import Header from './components/shared/Header.jsx'
import Routes from './routes';
import { getMagazine } from './services/ApiMethods.js'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      magazine: {
        color_1: "#3A606E",
        color_2: "#607B7D",
        color_3: "#878787",
        color_4: "#FEF2AC"
      },
      refresh: true
    }
  }

  componentDidMount = () => {
    this.getInfo();
  }

  componentDidUpdate = () => {
    this.addColors();
    this.topSpacer();
  }

  getInfo = async () => {
    const magInfo = await getMagazine();
    console.log(`hi hi hi`, magInfo);
    this.setState({
        magazine: magInfo 
    })
    this.addColors();
  }

  topSpacer = () => {
    console.log('spacin');
    const container = document.querySelector('.mainContainer');
    const menu = document.querySelector('.leftNav');
    const header = document.querySelector('header');
    if (container && window.matchMedia('(max-width: 900px)').matches) {
        container.style.marginTop = `${header.offsetHeight}px`;
        menu.style.top = `${header.offsetHeight}px`;
    }
}

  forceIt = (stateObj) => {
    if (stateObj) {
      this.setState({magazine: stateObj});
    } else {
      console.log('whyyyyyyyy');
      this.getInfo();
      this.forceUpdate();
    }
    return true;
  }

  addColors = () => {
    const styleSet = document.documentElement.style;
    styleSet.setProperty("--primary-color", this.state.magazine.color_1);
    styleSet.setProperty("--soft-primary-color", this.state.magazine.color_2);
    styleSet.setProperty("--secondary-color", this.state.magazine.color_3);
    styleSet.setProperty("--highlight-color", this.state.magazine.color_4);
  }

  render () {
    return (
      <div className="App">
        <Header magazine={this.state.magazine} />
        <Routes magazine={this.state.magazine} refresh={this.forceIt} />
      </div>
    );
  }
}

export default App;
