export default class {
	constructor(existing = []) {
		this.passages = existing;
	}

	get length() {
		return this.passages.length;
	}

	get last() {
		return this.passages[this.passages.length - 1];
	}

	add(passage) {
		this.passages.push(passage);
	}

	clear() {
		this.passages = [];
	}

	toString() {
		return this.passages.toString();
	}
}