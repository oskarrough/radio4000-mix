import React, { Component } from 'react';
import './styles/App.css';
import logo from './images/logo.svg';
import Deck from './Deck';
import Mixer from './Mixer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      radioSlugA: 'sugar-hiccup',
      radioSlugB: 'nikita',
      volumeInput: 50,
      volumeDeckA: 50,
      volumeDeckB: 50
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onMixerVolumeChange = (event) => {
    const volumeInput = event.target.value;
    const volumeDeckA = 100 - volumeInput;
    const volumeDeckB = volumeInput;
    this.setState({
      volumeInput,
      volumeDeckA,
      volumeDeckB
    })
  }
  render() {
    return (
      <div className="App">
	<nav>
	  <a className="SiteTitle" href="https://radio4000.com" target="_blank" title="Radio4000.com" rel="noopener noreferrer">
	    <img src={ logo } alt="mix.radio4000.com"/>
	  </a>
	  <a href="https://github.com/internet4000/radio4000-mix" className="App-source">github</a>
	</nav>
	<section className="Section">
	  <Deck radioSlug={ this.state.radioSlugA }
		volumeDeck={ this.state.volumeDeckA }
		handleChange={ this.handleChange }/>
	</section>

	<section className="Section">
	  <Mixer volumeDeckA={ this.state.volumeDeckA }
		 volumeDeckB={ this.state.volumeDeckB }
		 onMixerVolumeChange={ this.onMixerVolumeChange }
		 volumeInput={ this.state.volumeInput } />
	</section>
	
	<section className="Section">
	  <Deck radioSlug={ this.state.radioSlugB }
		volumeDeck={ this.state.volumeDeckB }
		handleChange={ this.handleChange }/>
	</section>
      </div>
    );
  }
}

export default App;
