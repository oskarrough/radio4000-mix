import React, { Component } from 'react';
import './styles/App.css';
import logo from './images/logo.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      radioSlugA: 'oskar',
      radioSlugB: '200ok',
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
	<a className="SiteTitle" href="https://radio4000.com" target="_blank" title="Radio4000.com" rel="noopener noreferrer">
	  <img src={ logo } alt="mix.radio4000.com"/>
	</a>
	<section className="Section">
	  <article className="Deck">
	    <label className="Deck-switcher">
	      <input type="text"
		     name="radioSlugA"
		     value={ this.state.radioSlugA }
		     onChange={ this.handleChange }
		     placeholder="radio4000 slug"/>
	    </label>
	    <radio4000-player className="Deck-player"
			      slug={ this.state.radioSlugA }
			      volume={ this.state.volumeDeckA }></radio4000-player>
	  </article>
	</section>

	<section className="Section">
	  <article className="Mixer">
	    <div className="Mixer-volumes">
	      <span className="Mixer-volume Mixer-volume--a">{ this.state.volumeDeckA }%</span>
	      <span className="Mixer-volume Mixer-volume--b">{ this.state.volumeDeckB }%</span>
	    </div>
	    <input className="Mixer-volumeInput"
		   type="range"
		   onChange={ this.onMixerVolumeChange }
		   value={this.state.volumeInput}/>
	  </article>
	</section>
	
	<section className="Section">
	  <article className="Deck">
	    <label className="Deck-switcher">
	      <input type="text"
		     name="radioSlugB"
		     value={ this.state.radioSlugB }
		     onChange={ this.handleChange }
		     placeholder="radio4000 slug"/>
	    </label>
	    <radio4000-player className="Deck-player"
			      slug={ this.state.radioSlugB }
			      volume={ this.state.volumeDeckB }></radio4000-player>
	  </article>
	</section>
      </div>
    );
  }
}

export default App;
