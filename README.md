# cdnjs-swarm
Use WebTorrents to simulate cdnjs with ability to pull and insert js from pre-specified sources. You should be able to choose any URL, especially those from [cdnjs.com](https://cdnjs.com).

##Requirements

1. Download js to localstorage using webtorrent
2. Script loading from localstorage using basket.js / tap.js
3. Check for WebRTC compatibility

##Dependencies

* [Basket.js](https://addyosmani.com/basket.js/): single domain
* [Tap.js](https://bkardell.github.io/tap/): cross-domain
* [Webtorrent](https://github.com/feross/webtorrent)
