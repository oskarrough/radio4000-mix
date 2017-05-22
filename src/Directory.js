import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Directory.css';
import ChannelCard from './ChannelCard'

export default class Directory extends Component {
  constructor() {
    super();
    this.state = {
      channels: []
    }
  }
  componentDidMount() {
    this.fetchRadios().then(channels => {
      this.setState({
	channels
      });
    })
  }

  fetchRadios() {
    return fetch('https://api.radio4000.com/v1/channels/').then(res => {
      return res.json()
    })
  }
  
  render() {
    if (!this.state.channels.length) {
      return (
	<p className="Aside Directory">Loading...</p>
      )
    }
    return (
      <aside className="Aside Directory">
	<div className="ChannelCards">
	  { this.state.channels.map((channel, index) => <ChannelCard key={ index } model={ channel }/>) }
	</div>
      </aside>
    )
  }
}
