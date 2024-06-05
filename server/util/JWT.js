const jsonwebtoken=require("jsonwebtoken")
 const secret="secret"
const JWT={
    generate(value,exprires){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret);
        }catch(err){
            return false;
        }
    }
 }

 module.exports=JWT