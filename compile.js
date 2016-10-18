// compile package.json? Browserify?

// Dependencies:
// insert npm modules from https://unpkg.com/package@version
// TODO: if no location for dependency, use cdnjs

// TODO: handle unpkg.com errors
// -------------

// require(package)
// ----------------
/*
// keep best link on registry
 1. check unpkg.com/package/package.min.js
 2. check unpkg.com/package/package-min.js
 3. check unpkg.com/package/dist/package.min.js
 4. check unpkg.com/package/dist/package-min.js
 5. check unpkg.com/package for require
 6. check cdnjs
 https://cdnjs.com/libraries/co
 https://api.cdnjs.com/libraries/co
 */

// package not found
// -----------------
/*
// https://unpkg.com/double
Not found: package "double"
*/

// Package moved
// -----------------

/*
// https://unpkg.com/babel

throw new Error("The node API for `babel` has been moved to `babel-core`.");
*/

// Package contents are elsewhere
// -----------------
/*
// https://unpkg.com/react

'use strict';

module.exports = require('./lib/React');
*/



// pre-compiled package.json
// -------------------------

var packages = [
  {
    "name": "webtorrent@0.97.2",
    "location": "npm",
    "loader": "js"
  },
  {
    "name": "bootstrap.min.css",
    "location": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    "loader": "css"
  },
  {
    "name": "typed",
    "dependencies": [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
    ],
    "location": "https://cdnjs.cloudflare.com/ajax/libs/typed.js/1.1.4/typed.min.js",
    "loader": "js"
  },
]

// Find / generate magnet links
// TODO: generate magnet links
// TODO: make registry
//

unction loadjscsstor(fileloc, filetype, filename) {
  // TODO: separate filename@version
  var client = new XMLHttpRequest();
  client.open('GET', fileloc);
  client.responseType = "blob"
  client.onload = function() {
    // console.log(client.response)
    blobs['WebTorrent'] = client.response
    var url = URL.createObjectURL(client.response)
    console.log(url)
    injectFile(url, filetype, filename)
    console.log("test")

    window.setTimeout(function(){
      console.log("hi")
      torClient = new WebTorrent()
      //  'wss://tracker.btorrent.xyz'
      var blob = client.response
      torClient.seed(blobToFile(blob, filename), function (torrent) {
        console.log('Client is seeding ' + torrent.magnetURI)
        torrent.addWebSeed(fileloc)
        console.log(torrent.files[0].length)
      })

    }, 1000)
  }
  client.send();
}


function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

// Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 405. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
// torrent.addWebSeed(url)
