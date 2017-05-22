import React from 'react';
import './styles/ChannelCard.css';

export default function ChannelCard(props) {

  const { title,
	  tracks,
	  slug,
	  handleClick } = props.model;

  if (!tracks) return null;

  return (
    <article className="ChannelCard" onClick={ () => console.log(title) }>
      <span>{ title } ({ tracks.length })</span>
      <div className="BtnGroup">
	<button title="A"
		className="Btn"
		title={`Send <${title}> to deck A`}
		onClick={ handleClick }>A</button>
	<button title="B"
		className="Btn"
		title={`Send <${title}> to deck B`}
		onClick={ handleClick }>B</button>
      </div>
    </article>
  )
}
