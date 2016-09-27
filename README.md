# cdnjs-swarm

A client library that uses WebTorrents to distribute javascript to simulate a large CDN, such as cdnjs with ability to pull js from pre-specified sources and insert it into HTML documents. You should be able to choose any URL, especially those from [cdnjs.com](https://cdnjs.com).

##Requirements

1. Download js to localstorage using webtorrent
2. Script loading from localstorage using basket.js / tap.js
3. Check for WebRTC compatibility

##Dependencies

* [Basket.js](https://addyosmani.com/basket.js/): single domain
* [Tap.js](https://bkardell.github.io/tap/): cross-domain
* [Webtorrent](https://github.com/feross/webtorrent)
* [Bower](https://bower.io/): how to get the packages you need from the front end
