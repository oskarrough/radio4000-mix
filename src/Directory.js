import React, { Component } from 'react';
import { getChannels } from './api';
import './styles/Directory.css';
import ChannelCard from './ChannelCard'
import Loading from './Loading'


export default class Directory extends Component {
  constructor() {
    super();
    this.state = {
      channels: []
    }
  }
  
  componentDidMount() {
    getChannels().then(channels => {
      this.setState({channels});
    })
  }
  
  render() {
    if (!this.state.channels.length) {
      return (
        <aside className="Aside Directory"><Loading text="Loading channels"/></aside>
      )
    }
    return (
      <aside className="Aside Directory">
	<div className="ChannelCards">
	  { this.state.channels.map((channel, index) => <ChannelCard
							    key={ index }
							    model={ channel } />) }
	</div>
      </aside>
    )
  }
}
