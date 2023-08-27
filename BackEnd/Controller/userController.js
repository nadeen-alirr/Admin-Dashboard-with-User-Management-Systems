const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); 


const createSuperAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

   
    const superAdminExists = await User.findOne({ role: "Super Admin" });
    if (superAdminExists) {
      return res.status(409).json({ message: "Super Admin already exists." });
    }

  
    const newSuperAdmin = new User({
      username,
      email,
      password,
      role: "Super Admin",
    });
    await newSuperAdmin.save();

    return res.status(201).json({ message: "Super Admin created successfully." });
  } catch (error) {
    console.error("Error during Super Admin creation:", error);
    res.status(500).json({ message: "An error occurred during Super Admin creation." });
  }
};
  
 
  const createAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
   
      const superAdminExists = await User.exists({ role: "Super Admin" });
  
     
      const newAdminRole = superAdminExists ? "Admin" : "Super Admin";
  
      const newAdmin = new User({
        username,
        email,
        password,
        role: newAdminRole,
      });
      await newAdmin.save();
      return res.status(201).json({ message: "Admin created successfully." });
    } catch (error) {
      console.error("Error during Admin creation:", error);
      res.status(500).json({ message: "An error occurred during Admin creation." });
    }
  };
  

  const registerUser = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: "User with this email already exists." });
      }
  
  
      const superAdminExists = await User.exists({ role: "Super Admin" });

      if (superAdminExists && role === "Super Admin") {
        return res.status(400).json({ message: "SuperAdmin registration is not allowed." });
      }
  
     
      const newUser = new User({
        username,
        email,
        password,
        role,
      });
      await newUser.save();
  
      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: "An error occurred during user registration." });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
     
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password);
  
     
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      const token = jwt.sign(
        { userId: user._id, role: user.role ,email:user.email ,username:user.username},
        process.env.ACSESS_TOKEN_SECRET_KIY,
        { expiresIn: "10h" } 
      );
  
      
      res.status(200).json({ token: token });
    } catch (error) {
      console.error("Error occurred during login:", error);
      res.status(500).json({ message: "An error occurred during login." });
    }
  };

  const  Token= async (req, res) => {
     try {
        const token=req.body;
        const user= await  User.findOne({_id:token.id});
        if(!user){
            return res.status(400).json({error:"user not exist"});
        }else{
            return res.json({
              name:user.username,
              email:user.email
            });
            }

        }
    catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
      }
  }
  const AllUser = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); 
      res.json(users);
    } catch (error) {
      console.error('Error while fetching users:', error);
      res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
  }
  module.exports = { createSuperAdmin, createAdmin ,registerUser ,loginUser ,Token , AllUser};