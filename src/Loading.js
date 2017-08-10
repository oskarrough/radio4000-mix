import React from 'react';

export default function Loading(props) {
  if(props.text) {
    return <article className="Loading">{ props.text }...</article>
  } else {
    return <article className="Loading">Loading...</article>
  }
}
