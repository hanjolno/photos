//专门获取数据的对象getPicdir.js
var getPicdir = require("../models/getPicdir.js");
var formidable = require("formidable");
var path = require("path");
var sd = require("silly-datetime");
var fs = require("fs");
exports.showIndex = function(req,res){
    //res.send("我是router指定的首页")
    //var dirNames = {"names":getPicdir.getDirNames()};
    //console.log(dirNames);

    //页面
//    调用回调函数，有值之后填充index
    getPicdir.getDirNames(function(names){
        res.render("index",{
            "names":names
        });
    })
};
exports.showPhotos = function(req,res,next){
  //获取相册名
    var dirName = req.params.dirName;
//    根据相册名读取对应路径下的内容;
    getPicdir.getPhotos(dirName,function(err,photos){
        if(err){
            next();
            return;
        }
        res.render("photos",{
            "dirName":dirName,
            "photos":photos
        });
        //console.log(photos)
    })
};
exports.showUppage = function(req,res){
    getPicdir.getDirNames(function(names){
        res.render("upPage",{
            "names":names
        });
    })
};
exports.doPost = function(req,res){
//    提交表单信息
//    获取fiilds和file
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    //改成接受批量files
    //form.parse(req, function (err,fields,files) {
        var allfiles = [];
        form.on("file", function (name, file) {
            allfiles.push([name, file]);
        });
        //form.on('end', function(){
        //});
    form.parse(req, function (err, fields,files){
        for(var i=0;i<allfiles.length;i++){
            var picName = allfiles[i][1].name;
            //console.log(allfiles[i][1].name);
            var picExtname = path.extname(picName);
            var newName = sd.format(new Date(),"YYYYMMDDHHmmss")+Math.floor(Math.random()*1000+1000)+picExtname;
            fs.rename(allfiles[i][1].path,"./uploads/"+fields.dirName+"/"+newName,function(err){
                if(err){
                    res.end("图片改名失败");
                }
            });
        }
        res.render("success");
    });
};
exports.newDir=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        fs.mkdir("./uploads/"+fields.newDir,function(err){});
    });
    form.on("end",function(){
        getPicdir.getDirNames(function(names){
            res.render("index",{
                "names":names
            });
        })
    });
};