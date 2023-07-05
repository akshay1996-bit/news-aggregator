const jwt = require('jsonwebtoken');
const allUserData = require('../../userData.json')
const verfiyToken = (req,res,next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1],process.env.API_SECRET,function(err,decode){
            if(err){
                req.user = undefined;
                next()
            }else{
                const user = allUserData.users.filter((item)=> item.id == decode.id)
                if(user.length){
                    req.user = user[0];
                    next()
                }else{
                    res.status(500).send('user not found')
                }
            }
        })
    }else{
        req.user = undefined;
        req.message = "Authorization header not found"
        next()
    }
}

module.exports = verfiyToken;