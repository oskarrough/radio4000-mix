// Look ma, no hands!

let f

export function tweenValue(from, to, callback) {
	// Cancel previous animation if already running
	if (f) cancelAnimationFrame(f)

	const step = () => {
		if (from === to) {
			return cancelAnimationFrame(f)
		}
		from = from > to ? from - 1 : from + 1
		callback(from)
		f = requestAnimationFrame(step)
	}

	f = requestAnimationFrame(step)
}

// Below is copy/paste from radio4000-sdk because it isn't ESM ready.
function toObject(obj, id) {
	return Object.assign(obj, {id: id})
}
function toArray(data) {
	return Object.keys(data).map(function(id) {
		return toObject(data[id], id)
	})
}

export function findChannels(max) {
	let url = 'https://radio4000.firebaseio.com/channels.json'
	if (max) {
		url += '?orderBy="created"&limitToFirst=' + max
	}
	return fetch(url)
		.then(res => res.json())
		.then(toArray)
}

