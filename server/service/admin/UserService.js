const { delList } = require("../../controllers/admin/UserController")
const UserModle = require("../../models/UserModel")

const UserService={
    login:async({UserName,PassWord})=>{
        return UserModle.find({
            UserName,
            PassWord
         })
    },
    upload:async({_id,UserName,Introduction,Gender,Avatar})=>{
        if(Avatar){
            return UserModle.updateOne({
                _id
            },{
            UserName,Introduction,Gender,Avatar,
            })
       }else{
            return UserModle.updateOne({
                _id
            },{
            UserName,Introduction,Gender,
            })
       }
    },
    add:async({ UserName,PassWord,Introduction,Gender,Role,Avatar })=>{
        UserModle.create({UserName,PassWord,Introduction,Gender,Role,Avatar})
    },
    getlist:async({id})=>{
        return id?UserModle.find({_id:id},["UserName","Role","Avatar","Gender","Introduction","PassWord"])
        :UserModle.find({},["UserName","Role","Avatar","Gender","Introduction"])
    },
    delList:async({_id})=>{
        return UserModle.deleteOne({_id});
    },
    putList:async(data)=>{
        return UserModle.updateOne({_id:data._id},data)
    },
}
module.exports=UserService