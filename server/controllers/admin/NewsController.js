const NewsService =require( "../../service/admin/NewsService.js")
const JWT = require("../../util/JWT.js")

const NewsController={

    add:async(req,res)=>{
       const cover=req.file?`/news_uploads/${req.file.filename}`:""
       const {title,content,category,isPublish}=req.body;

       await NewsService.add({
          title,
          content,
          cover,
          category:Number(category),
          isPublish:Number(isPublish),
          editTime:new Date()   
       });
       res.send({
        ActionType:"OK"
       })  
    },
    getList:async(req,res)=>{
      const result=await NewsService.getList({_id:req.params.id});
      res.send({
         ActionType:"OK",
         data:result,
        })  
    },
    publish:async(req,res)=>{
      await NewsService.publish({
         ...req.body,
         editTime:new Date()
      });
      res.send({
         ActionType:"OK",
        }) 
    },
    delList:async(req,res)=>{
      await NewsService.delList({_id:req.params.id});
      res.send({
         ActionType:"OK",
        }) 
    } ,
    updateList:async(req,res)=>{
      const cover=req.file?`/news_uploads/${req.file.filename}`:""
      const {title,content,category,isPublish,_id}=req.body;

      await NewsService.updateList({
         _id,
         title,
         content,
         cover,
         category:Number(category),
         isPublish:Number(isPublish),
         editTime:new Date()   
      });
      res.send({
       ActionType:"OK"
      })  
    }
}

module.exports=NewsController