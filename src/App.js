import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import SiteNav from './SiteNav';
import MixingTable from './MixingTable';
import Directory from './Directory';
import DirectoryBtn from './DirectoryBtn'

export default class App extends Component {
  toggleDirectory() {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/directory');
    } else {
      this.props.history.push('/');
    }
  }

  selectRadio = (deck, radioSlug) => {
    this.setRadio(deck, radioSlug)
  }

  setRadio = (deck, radioSlug) => {
    this.setState({
      [deck]: radioSlug
    })
  }
  
  render() {
    return (
      <div className="App">
	<SiteNav/>
	<DirectoryBtn toggle={ () => this.toggleDirectory() }/>
	<Route path="/directory"
	       component={ Directory }/>
	<Route path="/"
	       component={ MixingTable } />
      </div>
    )
  }
}
