# cdnjs-swarm

A client library modelled off Bower, but uses WebTorrents to distribute javascript and CSS to simulate a large CDN, such as cdnjs with ability to pull js from pre-specified sources and insert it into HTML documents.

You should be able to choose any package, including npm, bower, or even URL, especially those from [cdnjs.com](https://cdnjs.com). Bower already has a [large registry of files](https://github.com/bower/registry). The registry would have to be updated to include magnet links, which could be updated every time a package is updated. It should also work regardless of whether or not a browser has WebRTC support.

##Requirements

1. Download js using webtorrent
2. Check for WebRTC compatibility
3. Minimize dependencies ahead of time using gulp
4. Allow for both registered scripts/css and personal scripts/css

##Dependencies

* [Basket.js](https://addyosmani.com/basket.js/): single domain
* [Tap.js](https://bkardell.github.io/tap/): cross-domain
* [Webtorrent](https://github.com/feross/webtorrent)
* [Gulp](http://gulpjs.com/)

