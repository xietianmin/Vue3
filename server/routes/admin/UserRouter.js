var express=require('express');
var UserRouter=express.Router();

const UserController = require( '../../controllers/admin/UserController');
const multer  = require('multer')
const upload = multer({ dest: 'public/avatar_uploads/' })

UserRouter.post("/adminapi/user/login",UserController.login)
UserRouter.post("/adminapi/user/upload",upload.single('File'),UserController.upload)
UserRouter.post("/adminapi/user/add",upload.single('File'),UserController.add)
UserRouter.get("/adminapi/user/list",UserController.getlist)
UserRouter.get("/adminapi/user/list/:id",UserController.getlist)
UserRouter.put("/adminapi/user/list/:id",UserController.putlist)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)
module.exports=UserRouter