const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserType={
    UserName:String,
    PassWord:String,
    Gender:Number,
    Introduction:String,
    Avatar:String,
    Role:Number,
}
const UserModel=mongoose.model('user',new Schema(UserType))

module.exports=UserModel