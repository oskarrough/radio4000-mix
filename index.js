// import {html, render} from 'lit-html/lib/lit-extended'
import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import {findChannels} from './radio4000-js-sdk.js'

const aside = document.querySelector('aside')
const left = document.querySelector('left')
const right = document.querySelector('right')

// Runs whenever you change the crossfader.
const setVolumes = event => {
  const vol = Number(event.target.value)
  const volA = 100 - vol
  const volB = vol
  render(deckTemplate({vol: volA}), left)
  render(deckTemplate({vol: volB}), right)
}

const crossfaderTemplate = (vol, onChange) => html`
  <input type="range" value=${vol} on-change=${onChange}>`

const channelTemplate = c => html`
  <div class="Channel">
    <button
      data-balloon="Add to deck A" data-balloon-pos="left"
      on-click=${() => render(deckTemplate({slug: c.slug}), left)}>←</button>
    <h3>${c.title}</h3>
    <button
      data-balloon="Add to deck B" data-balloon-pos="right"
      on-click=${() => render(deckTemplate({slug: c.slug}), right)}>→</button>
  </div>`
// <a href="https://radio4000.com/${c.slug}" on-click=${e => e.preventDefault()}">R4</a>

const filterByTracks = (list, minimumTracks = 20) =>
  list.filter(c => c.tracks && Object.keys(c.tracks).length > minimumTracks)

const channelsTemplate = html`
  <div class="Scrollable">
    ${findChannels(999)
      .then(filterByTracks)
      .then(c => c.map(c => channelTemplate(c)))}
  </div>
  ${crossfaderTemplate(50, setVolumes)}`

const deckTemplate = ({slug, vol} = {}) => html`
  <radio4000-player
    channel-slug$="${slug}"
    volume="${String(vol)}"
    autoplay="true"
    shuffle="true"></radio4000-player>`

// Start everything.
render(channelsTemplate, aside)
render(deckTemplate({slug: 'nikita'}), left)
render(deckTemplate({slug: 'radio-tobha'}), right)
