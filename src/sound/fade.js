/*
A utility function that gradually changes an <audio> element's volume to a new
value. This uses Robert Penner's easing equation (see
https://github.com/danro/jquery-easing/blob/master/jquery.easing.js).
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
	let lastTimestamp;
	let elapsed = 0;

	return new Promise(resolve =>
		window.requestAnimationFrame(timestamp => {
			function step(timestamp) {
				elapsed += timestamp - lastTimestamp;
				audioEl.volume = easeInOutQuad(
					elapsed,
					startValue,
					valueChange,
					duration
				);

				if (elapsed < duration) {
					lastTimestamp = timestamp;
					window.requestAnimationFrame(step);
				} else {
					resolve();
				}
			}

			lastTimestamp = timestamp;
			window.requestAnimationFrame(step);
		})
	);
}
