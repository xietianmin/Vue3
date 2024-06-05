const NewsModel = require("../../models/Newsmodel.js")


const NewsService={

    add: async({title,content,category,cover,isPublish,editTime})=>{
          return NewsModel.create({
            title,content,category,cover,isPublish,editTime
          })
    },
    getList: async({_id})=>{
      return _id?NewsModel.find({_id}):NewsModel.find({});
    },
    publish:async({_id,isPublish,editTime})=>{
      return NewsModel.updateOne({
        _id
      },{
        isPublish,
        editTime
      })
    },
    delList:async({_id})=>{
          return NewsModel.deleteOne({_id})
    },
    updateList:async({
      _id,
      title,
      content,
      cover,
      category,
      isPublish,
      editTime
    })=>{
      if(cover){
         return NewsModel.updateOne({_id},{  
          title,
          content,
          cover,
          category,
          isPublish,
          editTime
        })
      }else{
        return NewsModel.updateOne({_id},{  
          title,
          content,
          category,
          isPublish,
          editTime
        })
      }
    }
}

module.exports=NewsService