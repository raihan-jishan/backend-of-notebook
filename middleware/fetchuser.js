const jwt = require("jsonwebtoken"); //require jwt
const JWT_SECRET = "undifinedNull";
//  detchuser func
const fetchuser = (req, res, next) => {
  //  get the user from teh jwt token and add id to req.object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authencticate using valid token!" });
  }
  // try cath
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authencticate using valid token!" });
  }
};
module.exports = fetchuser;
