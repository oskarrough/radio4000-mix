import React from 'react';
import PropTypes from 'prop-types';
import './styles/ChannelCard.css';

function ChannelCard(props, context) {

  const { title,
	  tracks,
	  slug } = props.model;

  const { setRadio } = context;

  if (!tracks) return null;

  return (
    <article className="ChannelCard">
      <span>{ title } ({ tracks.length })</span>
      <div className="BtnGroup">
	<button className="Btn"
		title={`Send <${title}> to deck A`}
		onClick={ () => setRadio('a', slug) }>A</button>
	<button className="Btn"
		title={`Send <${title}> to deck B`}
		onClick={ () => setRadio('b', slug) }>B</button>
      </div>
    </article>
  )
}

ChannelCard.contextTypes = {
  setRadio: PropTypes.func
}

export default ChannelCard;
