import React, { Component } from 'react';
import Deck from './Deck';
import Mixer from './Mixer';
import PropTypes from 'prop-types';
import './styles/MixingTable.css';

class MixingTable extends Component {
  constructor() {
    super();
    this.state = {
      volumeInput: 50,
      volumeDeckA: 50,
      volumeDeckB: 50
    }
  }
  onMixerVolumeChange = (event) => {
    const volumeInput = Number(event.target.value);
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
      <main className="MixingTable">
	<section className="Section">
	  <Deck radioSlug={ this.context.a }
		volumeDeck={ this.state.volumeDeckA }/>
	</section>

	<section className="Section Section--mixer">
	  <Mixer volumeDeckA={ this.state.volumeDeckA }
		 volumeDeckB={ this.state.volumeDeckB }
		 onMixerVolumeChange={ this.onMixerVolumeChange }
		 volumeInput={ this.state.volumeInput } />
	</section>
	
	<section className="Section">
	  <Deck radioSlug={ this.context.b }
		volumeDeck={ this.state.volumeDeckB }/>
	</section>
      </main>
    );
  }
}

MixingTable.contextTypes = {
  a: PropTypes.string,
  b: PropTypes.string
}

export default MixingTable;
