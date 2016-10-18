/*
  One pack to rule them all.
  One magnet to bind them.
  One registry to collect uri's
  And through injection, bind them.
*/

// name: package@version

var packages = [
  {
    "_id": "webtorrent.min.js",
    "location": "https://raw.githubusercontent.com/feross/webtorrent/master/webtorrent.min.js",
    "loader": "js"
  },
  {
    "_id": "bob",
    "location": "npm",
    "loader": "js",
    "magnetURI": "magnet:?xt=urn:btih:6290b810ab239c6985c9e35ae60f9715a9467c32&dn=modernizr.txt&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com"
  },
  {
    "_id": "bootstrap.min.css",
    "location": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    "loader": "css"
  },
  {
    "_id": "typed",
    "dependencies": [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
    ],
    "location": "https://cdnjs.cloudflare.com/ajax/libs/typed.js/1.1.4/typed.min.js",
    "loader": "js"
  },
  {
    "_id": "testImg",
    "location": "http://1.gravatar.com/avatar/41e808626dfb24f530c7c01c009d2604?s=60&d=mm&r=g",
    "loader": "img"
  }
];

// quick WebRTC check
function testRTC() {
  var test = window.RTCSessionDescription;
  if (String(testRTC) == 'undefined') {
    return false
  }
  return true
}

function loadWebTorrent() {
  loadExtResource(packages[0])
  // TODO: callback from function
  // callback result gives bloburl
  // injectFile(bloburl, "js", "webtorrent.min.js")
}
// important to keep track of the blob urls to refer to when determining order of injection for dependencies' sake
var blobs = [];

function makeElement(fileref) {
  console.log("file: ");
  console.log(fileref);
  if (typeof fileref!="undefined") {
      document.body.appendChild(fileref);
      console.log("done!");
  }
  else {
    console.log(filename + " not found");
  }
  return fileref;

}

function injectFile(fileurl, filetype, filename) {
  if (filetype=="js") { //if filename is a external JavaScript file
      var fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", fileurl);
      fileref.setAttribute("name", filename);
      makeElement(fileref);
  }
  else if (filetype=="img") {
      // to maintain style, you need the id of the tag to insert
      // inject src=fileurl, where id="filename"
      var fileref = document.getElementById(filename)
      fileref.setAttribute('src', fileurl)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
      var fileref=document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", fileurl);
      fileref.setAttribute("name", filename);
      makeElement(fileref);
  }

  // TODO: check readyState
  /*
  domReady: function(callback) {
    (document.readyState === "interactive" || document.readyState === "complete") ? callback() : document.addEventListener("DOMContentLoaded", callback);
  }
  */
}

// TODO: callback
// TODO: at callback, check dependencies and load
// TODO: remove filetype and filename from loadExtResource (more important for injection)
function loadExtResource(depend) {
  // check if blob is already loaded / loading
  if (!blobs.hasOwnProperty(depend._id)) {
    var client = new XMLHttpRequest();
    blobs[depend._id] = ""; // marker that indicates file is loading
    client.open('GET', depend['location']);
    console.log(depend._id + ": ")
    console.log(depend["location"])
    client.responseType = "blob";
    client.onload = function() {
      blobs[depend._id] = client.response;
      var url = URL.createObjectURL(client.response);
      console.log(url);
      injectFile(url, depend.loader, depend._id);
      console.log("test");
    }
    client.send();
  }
}

// fetch magnet URI from registry
function loadTorResource(depend) {
  // check if blob is already loaded / loading
  if (!blobs.hasOwnProperty(depend._id)) {
    var torClient = new WebTorrent();
    torClient.add(depend.magnetURI, function (torrent) {
      blobs[depend._id] = ""; // marker that indicates file is loading
      // torrent.addWebSeed(depend['location']);  // not sure if we want this
      torrent.on('done', function() {
        // WebTorrents can contain many files. Let's use the first.
        var file = torrent.files[0];

        // tbh, don't know what the var does, but the function is useful
        var flubber = file.getBlobURL(function (err, url) {
          if (err) throw err
          blobs[depend._id] = url;
          injectFile(url, depend.filetype, depend._id);
        });
      });

    });
  }

}

/*
  check trackers?
  opts.tracker.announce = [ … ]
  https://medium.com/@diegorbaquero/%C2%B5ws-as-your-next-websocket-library-d34209686357#.4l8edposm
*/


// TODO: load dependencies using dependency tree and blobs[]
// TODO: decide between loading all deps at end or checking for deps after loading each

// TODO: use promises to space out loading between dependencies
// ^ probably should use something like Browserify / webpack for that
// recursive loop to outline all dependencies in an array

// TODO: [optional] put blob into local storage
  // TODO: [optional] check localstorage for existing package

if (testRTC()) {
  loadWebTorrent()

  // TODO: make it so callback inside loadWebTorrent calls following code instead of timeout
  window.setTimeout(function(){
    if (WebTorrent.WEBRTC_SUPPORT) {
      // WebRTC is supported
      for (var i=1; i<packages.length; i++) {
        if (packages[i].hasOwnProperty("magnetURI")) {
          loadTorResource(packages[i])
        }
        else {
          loadExtResource(packages[i])
        }
      }
    } else {
      // don't use it.
      for (var i=1; i<packages.length; i++) {
        loadExtResource(packages[i])
      }
    }

  }, 1000)

}
else {
  for (var i=1; i<packages.length; i++) {
    loadExtResource(packages[i])
  }
}

// injection time

/*

  if (blobs['package'] == null) {
    // package hasn't started loading
  }

  // if another loop is waiting on the same dependency, don't load it twice!
  else if (blobs['package'] == // unresolved promise) {
    // wait for package to finish downloading
  }
  else {
    // package has loaded :D
    // inject!
  }
  blobs['package'].then

*/

// HINT: in promises, resolve is like the return function, e.g. function add(a,b){resolve(a+b)}
// HINT: promises are important for injection, NOT loading of js

// TODO: magnet URI registry

// TODO: image / video streamlining

// TODO: cache with basket.js
