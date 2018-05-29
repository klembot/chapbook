export default class {
	constructor() {
		this.el = document.createElement('div');
		this.tabList = document.createElement('ul');
		this.tabList.classList.add('tabs');
		this.el.appendChild(this.tabList);
		this.tabList.addEventListener('click', e =>
			this.showTab(e.target.dataset.tab)
		);
	}

	add(name) {
		const newTab = document.createElement('li');
		const newTabLink = document.createElement('a');
		const newContent = document.createElement('div');

		newTabLink.dataset.tab = name;
		newTabLink.setAttribute('href', 'javascript:void(0)');
		newTabLink.appendChild(document.createTextNode(name));
		newTab.appendChild(newTabLink);
		newContent.classList.add('tab-content');
		newContent.dataset.tab = name;
		this.tabList.append(newTab);
		this.el.append(newContent);

		if (this.tabList.children.length === 1) {
			this.show(name);
		}

		return newContent;
	}

	show(name) {
		Array.from(this.el.querySelectorAll('[data-tab]')).forEach(t => {
			if ((t.dataset.tab || t.dataset.tabName) === name) {
				t.classList.add('active');
			} else {
				t.classList.remove('active');
			}
		});
	}
}
