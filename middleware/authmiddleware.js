const jwt = require('jsonwebtoken')




const isAuthenticated = async (req, res, next) =>{
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json('no token found')
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(403).json('Invalid Token')
        }
        req.user = {
            id: decodedToken.id
        }

   })
    next()
}
module.exports = isAuthenticated
      







