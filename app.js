var express = require("express");
var router = require("./controllers");
var app = express();
//若要一个文件夹可以直接被用地址访问到   使用express.static方法
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.set("view engine","ejs");
app.listen(4000);
app.get("/",router.showIndex);
//添加处理/:dirName
app.get("/:dirName",router.showPhotos);
app.get("/upload",router.showUppage);
//上传图片
app.post("/upload",router.doPost);
app.post("/",router.newDir);
app.use(function(req,res){
   res.render("err");
});