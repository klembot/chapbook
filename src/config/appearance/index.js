import Body from './body';
import Links from './links';
import Page from './page';

let config = {};

let modules = [new Body(), new Page(), new Links()];
let stylesheet;

const updateStylesheet = () => {
	if (!stylesheet) {
		stylesheet = document.createElement('style');
		document.head.appendChild(stylesheet);
	}

	stylesheet.innerHTML = modules.reduce(
		(result, current) => result + current.css(),
		''
	);
};

modules.forEach(mod => {
	Object.keys(mod.props).forEach(key => {
		Object.defineProperty(
			config,
			key,
			{
				get: () => mod.props[key],
				set: value => { mod.props[key] = value; updateStylesheet(); }
			}
		)
	});
});

export default config;