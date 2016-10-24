#swarmpack [WIP]

A javascript bundler whose bundle.js contains links to packages, loading them asynchronously and injecting them into the client's DOM in order of dependencies.

You should be able to choose any package, including npm, bower, or even URL, especially those from [cdnjs.com](https://cdnjs.com). Bower already has a [large registry of files](https://github.com/bower/registry). The registry would have to be updated to include magnet links, which could be updated every time a package is updated. It should also work regardless of whether or not a browser has WebRTC support.

##Requirements

1. Ability to load the scripts asynchronously using promises
2. Ability to inject the scripts into the DOM in order of dependencies.
3. Maintain a registry similar to the bower registry. This registry connects the package name with a link to a cdn and a webtorrent magnet link.
4. Download js using webtorrent
5. Check for WebRTC compatibility. If not, download directly from CDN.
6. Maintain other functionality of webpack
7. Work with existing webpack plugins
8. Allow for custom links for js, png's, etc. Generate magnet link for those.
9. Use [unpkg.com](https://unpkg.com/#/) as CDN for npm packages
10. Optional web interface to compile bundle.js on github-pages page

##Dependencies

Potential:

* [Basket.js](https://addyosmani.com/basket.js/): single domain module caching
* [Tap.js](https://bkardell.github.io/tap/): cross-domain
* [Webtorrent](https://github.com/feross/webtorrent): sharing
* [WebPack](https://webpack.github.io/)

