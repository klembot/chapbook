export function parsePassageText(text: string) {
	const matchers = [
    // {embed passage: 'passage name'}
    /\{embed\s+passage\s*:\s*['"](.+?)['"]\s*}/g,

    // {link to: 'passage name', [label: '']}
    /\{link\s+to\s*:\s*['"](.+?)['"][^}]*\}/g,

    // {reveal link: 'label', passage: 'passage name'}
    /\{reveal\s+link.+passage\s*:\s*['"](.+?)['"].*\}/g
  ];

	const results = [];

	for (const matcher of matchers) {
		let match;

		while ((match = matcher.exec(text))) {
			results.push(match[1]);
		}
	}

	return results;
}
