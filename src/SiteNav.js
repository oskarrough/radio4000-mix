import React from 'react';
import logo from './images/logo.svg';
import './styles/SiteNav.css'

export default function SiteNav() {
  return (
    <nav className="SiteNav">
      <a className="SiteTitle" href="https://radio4000.com" target="_blank" title="Radio4000.com" rel="noopener noreferrer">
	<img src={ logo } alt="mix.radio4000.com"/>
      </a>
      <a href="https://github.com/internet4000/radio4000-mix" className="App-source">source</a>
    </nav>
  )
}
