'use strict';

var fs = require('fs');
var path = require('path');
var src_path = path.normalize(__dirname + '/dist');
var dist_path = path.normalize(__dirname + '/src');

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

/* 创建目录 */
if (!fs.existsSync(dist_path)) {
    fs.mkdirSync(dist_path, '0777', true);
}

/* 加密 */
function base64_decode(file, filename) {
    // read binary data
    var bitmap = fs.readFileSync(file, 'utf-8');

    // convert binary data to ascii encoded string
    var asciiStr = new Buffer.from(bitmap, 'base64').toString('utf8');

    fs.writeFileSync(filename, asciiStr);
}

for(var v in entris){
    var file = entris[v];
    base64_decode(file.srcPath, file.distPath);
}
