// import {html, render} from 'lit-html/lib/lit-extended'
import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import {findChannels} from './radio4000-js-sdk.js'

const left = document.querySelector('left')
const main = document.querySelector('main')
const aside = document.querySelector('aside')
const footer = document.querySelector('footer')
const right = document.querySelector('right')

// Runs whenever you change the crossfader.
const setVolume = vol => {
  vol = Number(vol)
  const volA = 100 - vol
  const volB = vol
  console.log({volA, vol, volB})
  render(deckTemplate({vol: volA}), left)
  render(crossfaderTemplate(vol), footer)
  render(deckTemplate({vol: volB}), right)
}

// This is a bit crazy and should be rewritten but works for now.
let raf
function fadeTo(to) {
  // Cancel any running animation.
  if (raf) cancelAnimationFrame(raf)

  let from = Number(document.querySelector('input[type="range"]').value)
  console.log(`fading from ${from} to ${to}`)

  // Animate and set volume every frame.
  let vol = from
  const frame = () => {
    if (vol === to) {
      cancelAnimationFrame(raf)
      return
    }
    vol = from > to ? vol - 1 : vol + 1
    setVolume(vol)
    raf = requestAnimationFrame(frame)
  }

  // start it.
  raf = requestAnimationFrame(frame)
}

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

const channelsTemplate = () => {
  const filterByTracks = (list, minimum = 20) =>
    list.filter(c => c.tracks && Object.keys(c.tracks).length > minimum)
  return html`
    ${findChannels(999)
      .then(filterByTracks)
      .then(c => c.map(c => channelTemplate(c)))}`
}

const crossfaderTemplate = vol => html`
  <button data-balloon="Fade left" data-balloon-pos="right"
    on-click=${() => fadeTo(0)}>←</button>
  <input type="range" value=${vol} on-change=${e => setVolume(e.target.value)}>
  <button data-balloon="Fade right" data-balloon-pos="left"
    on-click=${() => fadeTo(100)}>→</button>`

const deckTemplate = ({slug, vol} = {}) => html`
  <radio4000-player
    channel-slug$="${slug}"
    volume="${String(vol)}"
    autoplay="true"
    shuffle="true"></radio4000-player>`

// Start everything.
render(channelsTemplate(), aside)
render(crossfaderTemplate(50), footer)
render(deckTemplate({slug: 'nikita'}), left)
render(deckTemplate({slug: 'radio-tobha'}), right)
