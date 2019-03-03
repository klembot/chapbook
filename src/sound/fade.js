/*
A utility function that gradually changes an <audio> element's volume to a new
value. This uses Robert Penner's easing equation (see https://github.com/danro/jquery-easing/blob/master/jquery.easing.js).
*/

function easeInOutQuad(elapsed, startValue, valueChange, duration) {
	if ((elapsed /= duration / 2) < 1) {
		return (valueChange / 2) * elapsed * elapsed + startValue;
	}

	return (-valueChange / 2) * (--elapsed * (elapsed - 2) - 1) + startValue;
}

export default function fade(audioEl, volume, duration) {
	const startValue = audioEl.volume;
	const valueChange = volume - startValue;
	let elapsed = 0;

	function step(timestamp) {
		console.log(timestamp);
	}

	window.requestAnimationFrame(step);
}
