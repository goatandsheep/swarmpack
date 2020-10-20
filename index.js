/**
 * @typedef {Object} swarmpackCacheItem
 * @property {String} location backup location in case no WebTorrent support
 * @property {String} magnet
 * @property {String} loader e.g. 'js', 'css', 'img', etc.
 * @property {String} blobUrl
 */

export class Swarmpack {
    /**
     * @constructor
     */    
    constructor() {
        this.data = {}
        // TODO: use window object
    }

    /**
     * Add media item to data array
     */
    addKey(key, params) {
        //
    }

    /**
     * A Blob() is almost a File() - it's just missing the two properties below which we will add
     */
    blobToFile(theBlob, fileName){
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }
  
    // Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 405. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    // torrent.addWebSeed(url)

    /**
     * Inject value of key into element with 
     * @param {String} key 
     * @param {String} id
     * @param {String} [tagType]
     */
    injectKey(key, id, tagType) {
        if (tagType) {
            // TODO: use tagType
            switch(tagType) {
                case 'img':
                case 'js':
                case 'default':
                    document.getElementById(id).setAttribute('src', this.data[key].blobUrl)
            }
        } else {
            // TODO: guess using loader
        }
    }

    /**
     * Look for data attribute tags with swarmpack-related items
     */
    scanTags(scope='document') {
        const items = scope.querySelectorAll('[data-webtorrent-magnet]')
    }

    /**
     * webrtc check
     */
    testRTC() {
        var test = window.RTCSessionDescription;
        if (String(testRTC) == 'undefined') {
        return false
        }
        return true
    }
}
