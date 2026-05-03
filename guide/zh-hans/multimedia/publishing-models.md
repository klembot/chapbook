# 发布模式｜Publishing Models

Twine 2 目前不允许在故事文件中嵌入图像、音频或视频等资源。这是为了让您的故事能够快速高效地加载。Twine 1 通过使用一种称为 Base64 的技术对资源进行编码来允许此操作，该技术将二进制数据转换为可以安全嵌入HTML的文本。但这有两个缺点：

-   Base64 会使文件大小增加 33% 的开销，导致故事加载速度显著慢于原本可能达到的速度。
-   故事必须在其所有资源完全下载完成后才能开始播放。如果故事使用了许多图像，这可能会带来麻烦；而对于音频和视频文件（其大小通常是图像的十倍），这种情况将是灾难性的。

在 Twine 2 中，所有多媒体资源都必须独立于已发布的故事文件本身而存在。您可以选择两种方法。两种方法同样可行——具体取决于您的情况。

## 自包含发布｜Self-Contained Publishing

在这种方法中，您将故事使用的资源与已发布的故事文件本身存放在同一位置。典型的安排如下所示：

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

自包含模式的一个优势在于，你的作品可以轻松打包成归档文件（通常为 ZIP 格式），并在数字市场上架。这种情况下，玩家只需下载一次故事文件，解压后即可开始游玩，无需保持活跃的网络连接。

自包含故事也可直接发布至网站，这样玩家就无需额外经历下载归档文件并解压的步骤，但需要注意网站将消耗的带宽。带宽是衡量网站数据传输量的指标。如果你发布的故事包含一个 1MB 大小的音频文件（约 1 分钟时长），且有 1000 名玩家体验，网站将消耗 1GB 带宽。

一些网站托管服务商承诺以固定费用提供无限带宽，但若网站使用过多带宽则会限制连接速度；另一些服务商则会暂时关闭使用过多带宽的网站。还有些服务商会保持您的网站全速运行，无论消耗多少带宽，但会根据实际使用量收取浮动费用——有时金额相当高昂。

总而言之：如果您计划将独立故事发布到网站，应当了解所选托管服务商的使用限制。

独立发布的另一个缺点是，Twine 2 目前缺乏足够工具来辅助故事创作。为确保素材正确显示，您必须将故事发布至与素材相同的文件夹。在 Twine 2 内部测试故事时，素材将无法正常显示。

当您向独立故事添加资源时，需要使用_相对 URL_。您之前已经接触过URL——它们显示在网页浏览器窗口的顶部，用于指示资源的存储位置。它们通常以 `http://` 或 `https://` 开头。然而，相对URL是根据您已发布的故事文件的位置来定位资源的。在上面的示意图中，开场音乐的相对 URL 是 `Assets/Audio/Intro Song.mp3`。相对 URL 不以任何前缀开头；相反，故事文件目录下的每个子目录都用正斜杠（`/`）分隔，资源文件名放在最后。如果您链接的资源与已发布的故事文件位于同一目录中，那么该资源的文件名即可作为相对 URL 使用。


## 云发布｜Cloud Publishing

在这种模式下，您将资产发布到现有的服务平台，如 Flickr 或 YouTube。故事文件可供下载或发布至网站，但资产会从这些外部站点加载。因此，玩家在游戏过程中需要保持活跃的互联网连接。

云发布意味着您无需担心带宽问题，但作为交换，大多数服务会在您的资源上添加某种水印或其他标识信息，以表明您正在使用他们的服务。托管服务也有服务条款，可能会对您发布的内容类型施加限制。

云端发布还允许您在 Twine 2 中直接测试故事，无需将故事发布为文件。为此，您有时会使用 _嵌入代码_ 将资源整合到故事中——这是由您使用的服务提供的 HTML 源代码片段。

若选择使用云端资源，务必确保您具备合法使用权限。直接盗链资源（即未经许可从其他服务器嵌入素材）的行为极具诱惑力，但那是种不当做法——您可能使资源所有者承担带宽成本（如前述“自包含发布模式”所述），且若被资源所有者发现，对方可移除您链接的资源，甚至替换为令人反感或尴尬的内容。

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