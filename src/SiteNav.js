import React from 'react';
import './styles/SiteNav.css'

export default function SiteNav() {
	return (
		<nav className="SiteNav">
			<a href="https://radio4000.com/auth/signup"
				target="_blank"
				title="Go to Radio4000.com to create a radio"
				rel="noopener noreferrer">Create radio</a>
			<a href="https://support.internet4000.com/radio4000-mix"
				target="_blank"
				title="Find help about Radio4000 mix"
				rel="noopener noreferrer">Help</a>
			<a href="https://github.com/internet4000/radio4000-mix"
				target="_blank"
				title="See this site's source code on GitHub"
				rel="noopener noreferrer">GitHub</a>
		</nav>
	)
}
