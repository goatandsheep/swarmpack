
// important to keep track of the blob urls to refer to when determining order of injection for dependencies' sake
var blobs = [];

// quick WebRTC check
function testRTC() {
  var test = window.RTCSessionDescription;
  if (String(testRTC) == 'undefined') {
    return false
  }
  return true
}

if(this.hasOwnProperty('packages')) { 
  console.log('swarmpack')
}