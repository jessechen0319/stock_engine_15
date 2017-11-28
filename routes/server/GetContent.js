var http = require("http");
var https = require("https");
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
//,,,


//....

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on("end", function() {
            callback(iconv.decode(bufferHelper.toBuffer(),'GBK'));
        });
    }).on("error", function(error) {
        callback(null, error);
    });
}

module.exports.download = download