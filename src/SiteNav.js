import React from 'react';
import './styles/SiteNav.css'

export default function SiteNav() {
  return (
    <nav className="SiteNav">
      <a href="https://support.internet4000.com/radio4000-mix"
	 target="_blank"
	 title="Find help about "
	 rel="noopener noreferrer">Help</a>
      <a href="https://github.com/internet4000/radio4000-mix"
	 target="_blank"
	 title="See this site's source code on Github"
	 rel="noopener noreferrer">Github</a>
    </nav>
  )
}
