function easeInOutQuad(
	elapsed: number,
	startValue: number,
	valueChange: number,
	duration: number
) {
	if ((elapsed /= duration / 2) < 1) {
		return (valueChange / 2) * elapsed * elapsed + startValue;
	}

	return (-valueChange / 2) * (--elapsed * (elapsed - 2) - 1) + startValue;
}

/**
 * A utility function that gradually changes an <audio> element's volume to a
 * new value. This uses Robert Penner's easing equation (see
 * ).
 * @param el element whose volume to change
 * @param volume volume, 0-1, to change to
 * @param duration transition duration in milliseconds
 * @see https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 */
export default function fadeAudioEl(
	el: HTMLAudioElement,
	volume: number,
	duration: number
): Promise<void> {
	const startValue = el.volume;
	const valueChange = volume - startValue;
	let lastTimestamp: number;
	let elapsed = 0;

	if (el.volume === volume) {
		return Promise.resolve();
	}

	return new Promise(resolve =>
		window.requestAnimationFrame(timestamp => {
			function step(timestamp: number) {
				elapsed += timestamp - lastTimestamp;
				el.volume = easeInOutQuad(elapsed, startValue, valueChange, duration);

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
