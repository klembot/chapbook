export default function factoryFor(prototype) {
	return (...args) => new prototype(...args);
}
