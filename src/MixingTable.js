import React, { Component } from 'react';
import Deck from './Deck';
import Mixer from './Mixer';
import './styles/MixingTable.css';

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
      <div className="MixingTable">
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
