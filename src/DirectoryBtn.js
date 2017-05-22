import React, { Component } from 'react';

export default class DirectoryBtn extends Component {
  render() {
    return <button onClick={ this.props.toggle }
		   className="Btn DirectoryBtn">></button>
  }
}
