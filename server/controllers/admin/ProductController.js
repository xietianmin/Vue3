const ProductService =require( "../../service/admin/ProductService.js")
const JWT = require("../../util/JWT.js");
const { getList, updateList } = require("./NewsController.js");

const ProductController={

    add:async(req,res)=>{
       const cover=req.file?`/product_uploads/${req.file.filename}`:""
       const {title,introduction,detail,}=req.body;

       await ProductService.add({
          title,
          introduction,
          detail,
          cover,
          editTime:new Date()   
       });
       res.send({
        ActionType:"OK"
       })  
    },
    getList:async(req,res)=>{
      const result=await ProductService.getList({_id:req.params.id})
      res.send({
         ActionType:"OK",
         data:result
      })
    },
    delList:async(req,res)=>{
      await ProductService.delList({_id:req.params.id})
      res.send({
         ActionType:"OK"
      })
    },
    updateList:async(req,res)=>{
      const cover=req.file?`/product_uploads/${req.file.filename}`:""
      const {title,introduction,detail,_id}=req.body;
      await ProductService.updateList({
         _id,
         title,introduction,detail,
         cover,
         editTime:new Date()
      })
      res.send({
         ActionType:"OK"
      })
    }  

}

module.exports=ProductController