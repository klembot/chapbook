/*
Loads a Google font embed.
*/

let el;

export default function(src) {
	if (!el) {
		el = document.createElement('div');
		document.body.appendChild(el);
	}

	el.innerHTML = src;
}