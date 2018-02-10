// import {html, render} from 'lit-html/lib/lit-extended'
import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import {findChannels} from './radio4000-js-sdk.js'

const $ = document.querySelector.bind(document)
const left = $('left')
const main = $('main')
const aside = $('aside')
const footer = $('footer')
const right = $('right')

// Runs whenever you change the crossfader.
const setVolume = vol => {
	vol = Number(vol)
	const volA = 100 - vol
	const volB = vol
	render(deckTemplate({vol: volA}), left)
	render(crossfaderTemplate(vol), footer)
	render(deckTemplate({vol: volB}), right)
}

// This bit could be rewritten
let frame
function fadeTo(to) {
	if (frame) cancelAnimationFrame(frame) // cancel previous if already running
	let vol = Number($('input[type="range"]').value)
	const step = () => {
		const doneFading = vol === to
		if (doneFading) return cancelAnimationFrame(frame)
		vol = from > to ? vol - 1 : vol + 1 // go up or down
		setVolume(vol)
		frame = requestAnimationFrame(step) // run again
	}
	frame = requestAnimationFrame(step) // start
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

const filterByTracks = (list, minimum = 20) =>
	list.filter(c => c.tracks && Object.keys(c.tracks).length > minimum)

const channelsTemplate = html`
	${findChannels(999)
		.then(filterByTracks)
		.then(c => c.map(c => channelTemplate(c)))}`

const crossfaderTemplate = vol => html`
	<button data-balloon="Fade left" data-balloon-pos="right"
		on-click=${() => fadeTo(0)}>⇠</button>
	<input type="range" value=${vol} on-input=${e => setVolume(e.target.value)}>
	<button data-balloon="Fade right" data-balloon-pos="left"
		on-click=${() => fadeTo(100)}>⇢</button>`

const deckTemplate = ({slug, vol} = {}) => html`
	<radio4000-player
		channel-slug$="${slug}"
		volume="${String(vol)}"
		shuffle="true"></radio4000-player>`

// Start everything.
render(channelsTemplate, aside)
render(crossfaderTemplate(50), footer)
render(deckTemplate({slug: 'nikita'}), left)
render(deckTemplate({slug: 'radio-tobha'}), right)
