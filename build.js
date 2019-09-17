'use strict';

var fs = require('fs');
var path = require('path');
var src_path = path.normalize(__dirname + '/src');
var dist_path = path.normalize(__dirname + '/dist');

/* 获取文件 */
var entris = fs.readdirSync(src_path).reduce( function(o, filename) {
    if( /\.txt$/.test(filename)){
        o[filename] = {
            srcPath: path.join(src_path, filename),
            distPath: path.join(dist_path, filename)
        };
    }
    return o;
}, {});


/* 加密 */
function base64_encode(file, filename) {
    // read binary data
    var bitmap = fs.readFileSync(file, 'utf-8');

    // convert binary data to base64 encoded string
    var base64Str = new Buffer.from(bitmap).toString('base64');

    fs.writeFileSync(filename, base64Str);
}

for(var v in entris){
    var file = entris[v];
    base64_encode(file.srcPath, file.distPath);
}
