// Look ma, no hands!

let f

function tweenValue(from, to, callback) {
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

export {tweenValue}
