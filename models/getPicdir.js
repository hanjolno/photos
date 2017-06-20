var fs = require("fs");
var express = require("express");
exports.getDirNames=function(callback){
//    真正读取uploads文件下的所有文件夹
    fs.readdir("./uploads",function(err,data){
        var dirNames = [];
        if(err){throw err}
        //console.log(data)
        (function iterator(i){
            if(i==data.length){
                callback(dirNames);
                return;
            }
            fs.stat("./uploads/"+data[i],function(err,stat){
                if(stat.isDirectory()){
                    dirNames.push(data[i]);
                }
                iterator(i+1);
            })
        })(0);
    })
};
exports.getPhotos=function(dirName,callback){
    fs.readdir("./uploads/"+dirName,function(err,data){
        var allPhotos = [];
        if(err){
            callback("没有找到该路径下的文件夹",null);
            return;
        }
        //console.log(data)
        (function iterator(i){
            if(i==data.length){
                callback(null,allPhotos);
                return;
            }
            fs.stat("./uploads/"+dirName+"/"+data[i],function(err,stat){
                if(err){
                    callback(data[i]+"不存在",null);
                    return;
                }
                if(stat.isFile()){
                    allPhotos.push(data[i]);
                }
                iterator(i+1);
            })
        })(0);
    })
};