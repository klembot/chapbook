/**
 * Many of the properties in these interfaces are marked optional because it's
 * possible there is malformed story data.
 * @packageDocumentation
 */

/**
 * A single passage in the story.
 */
export interface Passage {
	/**
	 * Internal ID of the passage.
	 */
	id?: number;
	/**
	 * Name of the passage.
	 */
	name?: string;
	/**
	 * Source of the passage.
	 */
	source: string;
	/**
	 * Tags set on the passage.
	 */
	tags: string[];
}

/**
 * The story.
 */
export interface Story {
	/**
	 * Creator of the story (e.g. Twine or tweego).
	 */
	creator?: string;
	/**
	 * Version of the creator used with the story.
	 */
	creatorVersion?: string;
	/**
	 * Story JavaScript.
	 */
	customScripts: string[];
	/**
	 * Story stylesheets.
	 */
	customStyles: string[];
	/**
	 * IFID of the story.
	 */
	ifid?: string;
	/**
	 * Name of the story.
	 */
	name?: string;
	/**
	 * Options set on the story when published, e.g. `debug`.
	 */
	options?: string;
	/**
	 * Passages belonging to the story.
	 */
	passages: Passage[];
	/**
	 * Internal ID of the story's starting passage.
	 */
	startNode?: number;
}
