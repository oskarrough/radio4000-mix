import {html, render} from './node_modules/lit-html/lib/lit-extended.js'
import findChannels from './find-channels.js'
import {tweenValue} from './utils.js'
import {Gridnav} from './gridnav.js'

const $ = document.querySelector.bind(document)
const left = $('left')
const right = $('right')
const footer = $('crossfader')

const deckTpl = ({slug, vol} = {}) => html`
	<radio4000-player
		channel-slug$="${slug}"
		volume="${String(vol)}"
		shuffle="true"></radio4000-player>`

const channelTpl = ({title, body, slug} = {}) => html`
	<div class="Channel">
		<button class="tooltipped tooltipped-e" aria-label="Add to deck A"
			on-click=${() => render(deckTpl({slug}), left)}>←</button>
		<div class="Channel-content">
			<h3 class="Channel-title">${title}</h3>
			<small class="Channel-body">${body}</small>
		</div>
		<button class="tooltipped tooltipped-w" aria-label="Add to deck B"
			on-click=${() => render(deckTpl({slug}), right)}>→</button>
	</div>`

const searchTpl = html`
	<input type="search" placeholder="Search radios…" class="fuzzy-search">`

const channelsTpl = channels => html`
	${channels
		.filter(c => c.tracks && Object.keys(c.tracks).length > 20)
		.map(c => channelTpl(c))}`

const crossfaderTpl = (vol, update) => html`
	<button class="tooltipped tooltipped-e tooltipped-no-delay" aria-label="Fade left"
		on-click=${() => fadeTo(0)}>⇠</button>
	<input type="range" value=${vol}
		on-input=${e => update(e.target.value)}>
	<button class="tooltipped tooltipped-w tooltipped-no-delay" aria-label="Fade right"
		on-click=${() => fadeTo(100)}>⇢</button>`

const setVolume = vol => {
	vol = Number(vol)
	render(deckTpl({vol: 100 - vol}), left)
	render(crossfaderTpl(vol, setVolume), footer)
	render(deckTpl({vol}), right)
}

// Shortcut for fading volume
const fadeTo = (to, from = Number($('input[type="range"]').value)) =>
	tweenValue(from, to, setVolume)

// Start initial render
const queryParams = new URL(document.location).searchParams
render(deckTpl({slug: queryParams.get('a') || 'nikita'}), left)
render(deckTpl({slug: queryParams.get('b') || 'radio-tobha'}), right)
render(crossfaderTpl(50, setVolume), $('crossfader'))

findChannels().then(channels => {
	render(channelsTpl(channels), $('aside'))
	render(searchTpl, $('filter'))
	// Enable search with list.js
	let list = List($('main'), {valueNames: ['Channel-title', 'Channel-body']})

	var buttonlist = new Gridnav('.list')
})
