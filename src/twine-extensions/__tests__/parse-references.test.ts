import {describe, expect, it} from 'vitest';
import {parsePassageText} from '../parse-references';

describe('parsePassageText', () => {
  it.each([
    ['{embed passage: "test 1"}', ['test 1']],
    ['{link to: "test 1"}', ['test 1']],
    ['{link to: "test 1", label: "label"}', ['test 1']],
    ['{reveal link: "label", passage: "test 1"}', ['test 1']],
    [
      `{embed passage: "test 1"}
			{link to: "test 2"}
			{link to: "test 3", label: "label"}
			{reveal link: "label", passage: "test 4"}`,
      ['test 1', 'test 2', 'test 3', 'test 4']
    ]
  ])('parses %s as %s', (source, expected) =>
    expect(parsePassageText(source)).toEqual(expected)
  );
});
