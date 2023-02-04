const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  async auth(req, res, next) {
   
    const token = document.cookie.jwtToken ||req.header('jwtToken') || req.body.jwtToken;

    if (!token) {
      return res.status(403).json({ msg: 'authorization denied' });
    }
    try {
      //it is going to give use the user id (user:{id: user.id})
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify.user;
      return next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  }
}
module.exports = new AuthController();
