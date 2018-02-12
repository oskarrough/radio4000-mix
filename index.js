import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import findChannels from './find-channels.js'

const $ = document.querySelector.bind(document)

const left = $('left')
const right = $('right')
const footer = $('crossfader')

const deckTemplate = ({slug, vol} = {}) => html`
	<radio4000-player
		channel-slug$="${slug}"
		volume="${String(vol)}"
		shuffle="true"></radio4000-player>`

const channelTemplate = ({title, body, slug} = {}) => html`
	<div class="Channel">
		<button class="tooltipped tooltipped-e" aria-label="Add to deck A"
			on-click=${() => render(deckTemplate({slug}), left)}>←</button>
		<div class="Channel-content">
			<h3 class="Channel-title">${title}</h3>
			<small class="Channel-body">${body}</small>
		</div>
		<button class="tooltipped tooltipped-w" aria-label="Add to deck B" 
			on-click=${() => render(deckTemplate({slug}), right)}>→</button>
	</div>`

const filterByTracks = (list, minimum = 20) =>
	list.filter(c => c.tracks && Object.keys(c.tracks).length > minimum)

const filterTemplate = html`
	<input type="search" placeholder="Search radios…" class="fuzzy-search">`

const channelsTemplate = channels => html`
	${channels.map(c => channelTemplate(c))}`

const crossfaderTemplate = (vol, update) => html`
	<button class="tooltipped tooltipped-e tooltipped-no-delay" aria-label="Fade left"
		on-click=${() => fadeTo(0)}>⇠</button>
	<input type="range" value=${vol}
		on-input=${e => update(e.target.value)}>
	<button class="tooltipped tooltipped-w tooltipped-no-delay" aria-label="Fade right"
		on-click=${() => fadeTo(100)}>⇢</button>`

const setVolume = vol => {
	vol = Number(vol)
	render(deckTemplate({vol: 100 - vol}), left)
	render(crossfaderTemplate(vol), footer)
	render(deckTemplate({vol}), right)
}

// Tween the volume from its current value
let f
function fadeTo(to) {
	if (f) cancelAnimationFrame(f) // Cancel previous animation if already running
	let vol = Number($('input[type="range"]').value)
	const step = () => {
		const doneFading = vol === to
		if (doneFading) return cancelAnimationFrame(f)
		vol = vol > to ? vol - 1 : vol + 1
		setVolume(vol)
		f = requestAnimationFrame(step)
	}
	f = requestAnimationFrame(step)
}
// Get query params
const params = new URL(document.location).searchParams

render(crossfaderTemplate(50, setVolume), $('crossfader'))
render(deckTemplate({slug: params.get('a') || 'nikita'}), left)
render(deckTemplate({slug: params.get('b') || 'radio-tobha'}), right)
findChannels()
	.then(filterByTracks)
	.then(channels => {
		render(channelsTemplate(channels), $('aside'))
		render(filterTemplate, $('filter'))
		let list = List($('main'), {valueNames: ['Channel-title', 'Channel-body']})
	})
