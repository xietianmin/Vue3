const UserService =require( "../../service/admin/UserService.js")
const JWT = require("../../util/JWT.js")

const UserController={
    login:async(req,res)=>{
        var result=await UserService.login(req.body)
        if(result.length===0){
            res.send({
                code:"-1",
                error:"用户名或密码不匹配",
            })
        }else {
            const token=JWT.generate({
                _id:result[0].id,
                UserName:result[0].UserName,
            },"30s");
            res.header("Authorization",token);
            res.send({
                ActionType:"OK",
                data:{
                    UserName:result[0].UserName,
                    Gender:result[0].Gender?result[0].Gender:0,
                    Introduction:result[0].Introduction,
                    Avatar:result[0].Avatar,
                    Role:result[0].Role,
                }
            })
        }
    },
    upload:async(req,res)=>{
        const { UserName,Introduction,Gender }=req.body;
        const token=req.headers["authorization"].split(" ")[1];
        const Avatar=req.file?`/avatar_uploads/${req.file.filename}`:"";
        var payload=JWT.verify(token);
        await UserService.upload({
            _id:payload._id,
            UserName:UserName,
            Introduction:Introduction,
            Gender:Number(Gender),
            Avatar,
        })
        if(Avatar){
            res.send({
                ActionType:"OK",
                data:{
                    UserName:UserName,
                    Introduction:Introduction,
                    Gender:Number(Gender),
                    Avatar:Avatar,
                }
            })
        }
        else{
            res.send({
                ActionType:"OK",
                data:{
                    UserName:UserName,
                    Introduction:Introduction,
                    Gender:Number(Gender),
                }
            })
        }
    },
    add:async(req,res)=>{
        const { UserName, PassWord,Role,Introduction,Gender, }=req.body;
        const token=req.headers["authorization"].split(" ")[1];
        const Avatar=req.file?`/avatar_uploads/${req.file.filename}`:"";
        // const Avatar=`/avatar_uploads/${req.file.filename}`;
        var payload=JWT.verify(token);
        await UserService.add({
            _id:payload._id,
            UserName:UserName,
            PassWord:PassWord,
            Introduction:Introduction,
            Gender:Number(Gender),
            Role:Role,
            Avatar,
        })
        res.send({
            ActionType:"OK",
        })
    },
    getlist:async(req,res)=>{
        const result=await UserService.getlist(req.params);
        res.send({
            ActionType:"OK",
            data:result,
        });
    },
    delList:async(req,res)=>{
        const result=await UserService.delList({_id:req.params.id})
        res.send({
            ActionType:"OK"
        })
    },
    putlist:async(req,res)=>{
        const result=await UserService.putList(req.body)
        res.send({
            ActionType:"OK"
        })
    }
    
}
module.exports=UserController