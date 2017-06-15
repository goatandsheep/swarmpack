// pre-compiled bundle.js
// -------------------------

// look in bundle.json
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

// TODO: include injecTor
