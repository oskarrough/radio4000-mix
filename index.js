// import {html, render} from 'lit-html/lib/lit-extended'
import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import {findChannels} from './radio4000-js-sdk.js'

const $ = document.querySelector.bind(document)
const left = $('left')
const main = $('main')
const header = $('header')
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
		vol = vol > to ? vol - 1 : vol + 1 // go up or down
		setVolume(vol)
		frame = requestAnimationFrame(step) // run again
	}
	frame = requestAnimationFrame(step) // start
}

const channelTemplate = c => html`
	<div class="Channel">
		<button class="tooltipped tooltipped-e"
			aria-label="Add to deck A"
			on-click=${() => render(deckTemplate({slug: c.slug}), left)}>←</button>
		<h3 class="Channel-title">${c.title}</h3>
		<button class="tooltipped tooltipped-w"
			aria-label="Add to deck B" 
			on-click=${() => render(deckTemplate({slug: c.slug}), right)}>→</button>
	</div>`

const filterByTracks = (list, minimum = 20) =>
	list.filter(c => c.tracks && Object.keys(c.tracks).length > minimum)

const filterTemplate = html`
	<input type="search" placeholder="Search radios…" class="fuzzy-search">
	<button class="sort" data-sort="Channel-title">Sort by title</button>`

const channelsTemplate = (channels) => html`
	${channels.map(c => channelTemplate(c))}`

const crossfaderTemplate = vol => html`
	<button aria-label="Fade left" class="tooltipped tooltipped-e tooltipped-no-delay"
		on-click=${() => fadeTo(0)}>⇠</button>
	<input type="range" value=${vol} on-input=${e => setVolume(e.target.value)}>
	<button aria-label="Fade right" class="tooltipped tooltipped-w tooltipped-no-delay"
		on-click=${() => fadeTo(100)}>⇢</button>`

const deckTemplate = ({slug, vol} = {}) => html`
	<radio4000-player
		channel-slug$="${slug}"
		volume="${String(vol)}"
		shuffle="true"></radio4000-player>`

// Start everything.
findChannels()
	.then(filterByTracks)
	.then(channels => {
		render(channelsTemplate(channels), aside)
		render(filterTemplate, header)
		const list = new List(main, {
			valueNames: ['Channel-title'],
			list: 'oskar'
		})
	})
render(crossfaderTemplate(50), footer)
render(deckTemplate({slug: 'nikita'}), left)
render(deckTemplate({slug: 'radio-tobha'}), right)
