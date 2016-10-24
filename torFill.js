// The easiest way to load webpage assets using WebTorrent

// quick WebRTC check
function testRTC() {
  var test = window.RTCSessionDescription;
  if (String(testRTC) == 'undefined') {
    return false
  }
  return true
}

// important to keep track of the blob urls to refer to when determining order of injection for dependencies' sake
var blobs = [];

function fillSrc(element, source) {
    element.setAttribute('src', source)
}

// fetch magnet URI from registry
function loadTorResource(element, infohash, cb) {
  // check if blob is already loaded / loading
  if (!blobs.hasOwnProperty(infohash)) {
    var torClient = new WebTorrent()
    torClient.add(infohash, function (torrent) {
        console.log('murle')
      blobs[infohash] = ""; // marker that indicates file is loading
      // torrent.addWebSeed(depend['location']);  // not sure if we want this
      torrent.on('done', function() {
        // WebTorrents can contain many files. Let's use the first.
        var file = torrent.files[0];

        // tbh, don't know what the var does, but the function is useful
        var flubber = file.getBlobURL(function (err, url) {
          if (err) throw err
          blobs[infohash] = url;
          cb(element, blobs[infohash]);
        });
      });

    });
  }
  else {
      cb(element, blobs[infohash])
  }

}

// main
var elements = document.getElementsByClassName("tormedia")
var torSrc = ""
for(var i=0; i < elements.length; i++){
    var link = elements[i].getAttribute('href')
    if (testRTC()) {
        // var infohash = elements[i].getAttribute('infohash')
        var infohash = 'https://webtorrent.io/torrents/sintel.torrent'
        loadTorResource(infohash, fillSrc)
    }
    else {
        fillSrc(elements[i], link)
    }
}
