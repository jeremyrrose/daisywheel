import React from 'react';
import './App.css';
import Header from './components/shared/Header.jsx'
import Routes from './routes';
import { getMagazine } from './services/ApiMethods.js'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      magazine: {},
      refresh: true
    }
  }

  componentDidMount = () => {
    this.getInfo();
  }

  componentDidUpdate = () => {
    this.addColors();
  }

  getInfo = async () => {
    const magInfo = await getMagazine();
    console.log(`hi hi hi`, magInfo);
    this.setState({
        magazine: magInfo 
    })
    this.addColors();
  }

  forceIt = () => {
    console.log('whyyyyyyyy');
    this.getInfo();
    this.forceUpdate();
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
