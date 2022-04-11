//============

const { response } = require("express")

//============
const handleLogin = (req,res)=>{
     res.status(200).json({msg:"login hit"})
}
//============
//============
//============
//============
module.exports = {handleLogin}
//============
//============