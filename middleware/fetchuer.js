import dotenv from 'dotenv';
import localStorage from '../app.js';
import jwt from 'jsonwebtoken';
dotenv.config();

const fetchUser = async (req, res, next) => {

    // Get the JWT token from the request header.
    const token = localStorage.getItem('token');
  
    // If the token is not present.
    if (token==null) {
        res.render("user/err",{msg:"Please Login",red : "/login",btnName:"Login"});
    }
  
    // Try to verify the JWT token.
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
  
      // If the JWT token is not valid.
      if (!data) {
        res.render("user/err",{msg:"Please login first",red : "/login",btnName:"Login"});
      }
  
      // Call the next middleware function.
      next();
    } catch (err) {
      // If there is an error
      res.render("user/err",{msg:"Please Login agian",red : "/login",btnName:"Login"});
    }
  };

  export default fetchUser;