import React from 'react';
import './styles/ChannelCard.css';

export default function ChannelCard(props) {

  const { title, tracks } = props.model;

  if (!tracks) return null;

  return (
    <article className="ChannelCard" onClick={ () => console.log(title) }>
      <span>{ title } ({ tracks.length })</span>
    </article>
  )
}
