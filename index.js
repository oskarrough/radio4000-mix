import {findChannels} from './node_modules/radio4000-sdk/dist/radio4000-sdk.es.js'
import html from './node_modules/nanohtml/index.js'
import {tweenValue} from './utils.js'

const $ = document.querySelector.bind(document)
const left = $('left')
const right = $('right')
const footer = $('crossfader')

function render(el, container) {
	container.appendChild(el)
}

const deckTpl = ({slug, vol} = {}) => html`
	<radio4000-player
		channel-slug="${slug}"
		volume="${String(vol)}"
		shuffle="true"></radio4000-player>`

const searchTpl = html`
	<input type="search" placeholder="Search radios…" class="fuzzy-search">`

const channelTpl = ({title, body, slug} = {}) => html`
	<div class="Channel">
		<button class="tooltipped tooltipped-e" aria-label="Add to deck A"
			onclick=${() => render(deckTpl({slug}), left)}>←</button>
		<div class="Channel-content">
			<h3 class="Channel-title">${title}</h3>
			<small class="Channel-body">${body}</small>
		</div>
		<button class="tooltipped tooltipped-w" aria-label="Add to deck B"
			onclick=${() => render(deckTpl({slug}), right)}>→</button>
	</div>`

const channelsTpl = channels => {
	const byTracks = c => c.tracks && Object.keys(c.tracks).length > 20
	return html`<div>
		${channels.filter(byTracks).map(channelTpl)}
	</div>`
}

const crossfaderTpl = (vol, update) => html`
	<crossfader>
		<button class="tooltipped tooltipped-e tooltipped-no-delay" aria-label="Fade left"
			onclick=${() => fadeTo(0)}>⇠</button>
		<input type="range" value=${vol}
			on-input=${e => update(e.target.value)}>
		<button class="tooltipped tooltipped-w tooltipped-no-delay" aria-label="Fade right"
			onclick=${() => fadeTo(100)}>⇢</button>
	</crossfader>`

const setVolume = vol => {
	vol = Number(vol)
	render(deckTpl({vol: 100 - vol}), left)
	render(crossfaderTpl(vol, setVolume), footer)
	render(deckTpl({vol}), right)
}

// Shortcut for fading volume
const fadeTo = (to, from = Number($('input[type="range"]').value)) =>
	tweenValue(from, to, setVolume)

function start() {
	const queryParams = new URL(document.location).searchParams

	render(crossfaderTpl(50, setVolume), $('main'))
	render(deckTpl({slug: queryParams.get('a') || '200ok'}), left)
	render(deckTpl({slug: queryParams.get('b') || 'nomads'}), right)

	findChannels().then(channels => {
		render(channelsTpl(channels), $('aside'))
		render(searchTpl, $('filter'))

		// Enable search with list.js
		let list = List($('main'), {valueNames: ['Channel-title', 'Channel-body']})
	})
}

start()
