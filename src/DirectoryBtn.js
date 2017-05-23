import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class DirectoryBtn extends Component {
  handleLinkClick(event) {
    event.preventDefault();
  }
  render() {
    return (
      <button onClick={ this.props.toggle }
	      className="Btn DirectoryBtn">
	<NavLink exact to="/">
	  >
	</NavLink>
      </button>
    )
  }
}
