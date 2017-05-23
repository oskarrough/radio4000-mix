import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicProvider extends Component {

  static childContextTypes = {
    a: PropTypes.string,
    b: PropTypes.string,
    setRadio: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      a: '200ok',
      b: 'samro'
    }
  }

  getChildContext() {
    return {
      a: this.state.a,
      b: this.state.b,
      setRadio: this.setRadio.bind(this)
    }
  }

  setRadio(deck, slug) {    
    this.setState({
      [deck]: slug
    })
  }

  render() {
    return (
      <div className="MusicProvider">
	{ this.props.children }
      </div>
    )
  }
}
