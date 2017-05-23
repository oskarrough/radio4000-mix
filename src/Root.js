import React from 'react';
import { BrowserRouter as Router,
	 Route } from 'react-router-dom';
import App from './App';
import MusicProvider from './MusicProvider';

export default function Root() {
  return (
    <Router>
      <MusicProvider>
	<Route path="/" component={ App }/>
      </MusicProvider>
    </Router>
  )
}
