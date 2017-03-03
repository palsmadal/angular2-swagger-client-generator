// var generator = require('./lib/generator');

// module.exports = generator;
var fs = require('fs');
var path = require('path');

function walk(directoryName, filesArr) {
    fs.readdirSync(directoryName, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(function(file) {
            fs.stat(directoryName + path.sep + file, function(e, f) {

                
                if (f.isDirectory()) {
                    console.log("isDir");
                    filesArr.push(walk(directoryName + path.sep + file, []));
                } else {
                    console.log("isFile");
                    filesArr[0] = file;
                }
            })
        })
    })
    return filesArr;
}


function Walk2(directoryName, filesArr) {
    var filesInDir = fs.readdirSync(directoryName);
    filesInDir.forEach(function(file) {
        var f = fs.statSync(directoryName + path.sep + file);

        if (f.isDirectory()) {
            var foundFilesInChild = Walk2(directoryName + path.sep + file, []);
            foundFilesInChild.forEach(function(ffic){
                filesArr.push(directoryName + path.sep + ffic);
            });
        } else {    
            filesArr.push(file);
        }
    });
    return filesArr;
}


        
var pathToScan = "tests\\modelInterfaces";
var files = Walk2(pathToScan, []);

console.log(files);
// console.log(pathToScan);
// console.log(walk(pathToScan, []));