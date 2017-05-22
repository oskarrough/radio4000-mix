import React from 'react';

export default function Deck(props) {
  const { radioSlug, volumeDeck, handleChange } = props;
  return (
    <article className="Deck">
      <label className="Deck-switcher">
	<input type="text"
	       name="radioSlugA"
	       value={ radioSlug }
	       onChange={ handleChange }
	       placeholder="radio4000 slug"/>
      </label>
      <radio4000-player className="Deck-player"
			slug={ radioSlug }
			volume={ volumeDeck }></radio4000-player>
    </article>
  )
}
