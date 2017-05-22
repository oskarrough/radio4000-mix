import React from 'react';
import { BrowserRouter as Router,
	 Route } from 'react-router-dom';
import './styles/App.css';
import SiteNav from './SiteNav';
import MixingTable from './MixingTable';
import Directory from './Directory';


export default function App() {
  return (
    <Router>
      <div className="App">
	<SiteNav/>
	<Route path="/" component={ MixingTable }/>
	<Route path="/directory" component={ Directory }/>
      </div>
    </Router>
  )
}
