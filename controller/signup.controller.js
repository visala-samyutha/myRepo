
const signModel=require('../model/signup.model')
const jwt=require('jsonwebtoken');
async function saveUser(req, res) {
    try {
        const { email, password, username, mobileNumber } = req.body;
        const usere = await signModel.findOne({ email });
        if(usere){
            return res.status(300).json({"message":"user already exists"});
        }
        const user = await signModel.create({
            email,
            password,
            username,
            mobileNumber
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid details" });
    }
}
async function checkUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await signModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
       
        const token = jwt.sign({ userId: user._id }, "private_key");
        // Send token in response
        res.status(200).json({ token });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function verifyToken(req, res, next) {
    try {
        const token=req.headers.authorization.split(' ')[1];
      const verifyToken= await jwt.verify(token,"private_key");
      req.verifyToken=verifyToken;
      
          next();
      
        //res.status(200).json({"message":"profile accessed"})}
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports={saveUser,checkUser,verifyToken}
