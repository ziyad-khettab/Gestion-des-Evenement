const jwt = require('jsonwebtoken')
const config = require('config')
const User = require("../models/User");

exports.auth = async function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')
  
    // Check if not token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' })
    }
  
    // Verify token
    try {
      await jwt.verify(token, config.get('jwtSecret'), (error, decoded)=>{
        if(error){
          res.status(401).json({ msg: 'Token is not valid' })
        }
        else{
          req.user = decoded.user
          next();
        }
      });
    } catch (err) {
      console.error('something wrong with auth middleware')
      res.status(500).json({ msg: 'Server Error' })
    }
}

exports.isAdmin = async (req,res,next) =>{
    try{
        const id = req.user.id_user
        const user = await User.findOne({
            where:{
                id_user : id,
                isAdmin : true
            }
        })
        if(!user){
            return res.status(400).json({msg:"Vous n'êtes pas administrateur"})
        }

        next()
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:"Server Error"})
    }
}

exports.isAccountOwner = async (req,res,next)=>{
    if(parseInt(req.params.id) === parseInt(req.user.id_user))
        next()
    else
        res.status(403).json({msg:'Unauthorized action'})
}