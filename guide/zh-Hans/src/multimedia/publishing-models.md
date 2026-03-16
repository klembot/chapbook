# Publishing Models

Twine 2 does not currently permit embedding images, audio, or video--assets, for short--in your story files. This is so that your story loads quickly and efficiently. Twine 1 permitted this by encoding them using a technique called Base64, which converts binary data into text that can be safely embedded into HTML. This has two disadvantages:

-   Base64 adds a 33% overhead to file sizes, causing stories to load
    significantly slower than they could otherwise.
-   A story couldn't begin to be played until all its assets had completely
    downloaded. This can be troublesome if a story uses many images, but this
    would be disastrous for audio and video, where files are ten times as large.

In Twine 2, any multimedia assets must exist separately from the published story file itself. There are two approaches you can take. Either one is equally viable--it depends on your situation.

## Self-Contained Publishing

In this approach, you publish assets used by your story in the same place as the published story file itself. A typical arrangement is shown below:

<ul class="directory-listing">
	<li class="file">Story.html</li>
	<li class="directory">Assets
	    <ul>
	        <li class="directory">Images
	            <ul>
	                <li class="file">Photo 1.jpeg</li>
	                <li class="file">Photo 2.jpeg</li>
	            </ul>
	        </li>
	        <li class="directory">Audio
	            <ul>
	                <li class="file">Intro Song.mp3</li>
	            </ul>
	        </li>
	    </ul>
	</li>
</ul>

One advantage of the self-contained approach is that your work can be easily packaged into an archive file, usually in ZIP format, and made available on digital marketplaces. In this scenario, a player can download your story once, unpack it, and begin playing without having to have an active Internet connection.

A self-contained story can be published to a web site, so that players don't have to go to the extra step of downloading the archive file and expanding it, but you should be aware of the bandwidth the site will use. Bandwidth is a measurement of how much data is transferred to and from a web site. If you publish a story with an audio file that is 1 MB in size (about a minute long) that 1,000 people play, the site will consume 1 GB of bandwidth.

Some web site hosting providers promise unlimited bandwidth at a flat fee, but throttle connections if a site uses too much bandwidth; others will temporarily shut a site down that uses too much bandwidth. Others will keep your site available at full speed no matter how much bandwidth you consume, but charge you a variable--sometimes steep--amount of money depending on how much bandwidth it consumes.

All of which is to say: if you plan to post a self-contained story to a web site, you should understand the constraints of the hosting provider you use.

Another disadvantage to self-contained publishing is that Twine 2 doesn't currently have many tools to help you while you are creating your story. In order for assets to display correctly, you'll have to publish your story to the same folder as your assets. Testing your story inside Twine 2 will not display the assets correctly.

When you add assets to a self-contained story, you'll use a _relative URL_. You've encountered URLs before; they appear at the top of a web browser window, and indicate the location at which a resource is stored. They typically begin with `http://` or `https://`. Relative URLs, however, locate a resource in relation to your published story file. In the diagram above, the relative URL for the intro song is `Assets/Audio/Intro Song.mp3`. A relative URL does not start with any preamble; instead, each directory beneath the story file's directory is separated by a forward slash (`/`), with the file name of the asset given last. If you link to an asset in the same directory as the published story file, the filename of the asset works as a relative URL.

## Cloud Publishing

In this approach, you publish your assets to an existing service like Flickr or YouTube. Your story file can be downloaded or posted to a web site, but your assets will load from these external sites. As such, players will need to have an active Internet connection as they play.

Cloud publishing means you won't have to worry about bandwidth, but in exchange most services place some kind of watermark or other identifying information on your asset so that it's clear that you're using their service. Hosting services also have terms of service that may place restrictions on what kind of content you post.

Cloud publishing also allows you to test stories inside Twine 2 without having to publish your story to a file. To do this, you'll sometimes use an _embed code_ to incorporate your assets into your story, which is a fragment of HTML source code provided by the service you use.

If you choose to use assets in the cloud, it's important that you ensure that you are legally able to do so. It is tempting to _hotlink_ resources--that is, embed assets from another server without permission. This is bad form at minimum, as you are potentially incurring bandwidth costs for the site owner (as noted in _Self-Contained Publishing Above_ above), but if a site owner finds out you've done this, they can remove the assets you've linked to or replace them with something obnoxious or embarrassing.

<style>

ul.directory-listing {
	margin-left: 0;
	padding-left: 0;
}

ul.directory-listing, ul.directory-listing ul {
	list-style-type: none;
}

ul.directory-listing ul {
	margin-left: 0;
	padding-left: 0;
}

ul.directory-listing li.file, ul.directory-listing li.directory {
	padding-left: 24px;
	background-repeat: no-repeat;
	background-size: 16px;
	background-position: 4px 3px;
	min-height: 24px;
}

ul.directory-listing li.file {
	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItZmlsZSI+PHBhdGggZD0iTTEzIDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY5eiI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9IjEzIDIgMTMgOSAyMCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==);
}

ul.directory-listing li.directory {
	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItZm9sZGVyIj48cGF0aCBkPSJNMjIgMTlhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDVsMiAzaDlhMiAyIDAgMCAxIDIgMnoiPjwvcGF0aD48L3N2Zz4=);
}

</style>