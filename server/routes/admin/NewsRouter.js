var express=require('express');
var NewsRouter=express.Router();
const NewsController = require( '../../controllers/admin/NewsController');
const multer  = require('multer')
const upload = multer({ dest: 'public/news_uploads/' })

NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)

module.exports=NewsRouter