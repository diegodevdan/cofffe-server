const jwt = require('jsonwebtoken')

//uid: user idenfity
const generateJwt = (uid='') => {
    return new Promise((res,rej) => {

        //You can save all that you want
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEY,
            {
                expiresIn: '4h'
            }, (err,token) => {
                if(err){
                    console.log(err)
                    rej('Is not possible generate the JWT')
                } else {
                    res(token)
                }
            }
        )
    })
}






module.exports = {
    generateJwt
}