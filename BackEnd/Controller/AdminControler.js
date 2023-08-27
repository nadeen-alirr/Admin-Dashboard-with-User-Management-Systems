const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); 

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'Super Admin') {
      return res.status(403).json({ message: 'Deletion of Super Admin is not allowed' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error while deleting user:', error);
    return res.status(500).json({ message: 'An error occurred while deleting user' });
  }
}

const EditUser= async(req ,res)=>{
    try {
        const userId = req.params.id;
        const updatedUserFields = req.body; 
        if (updatedUserFields.role === "Super Admin") {
         
          const superAdminCount = await User.countDocuments({ role: "Super Admin" });
    
          
          if (superAdminCount > 0) {
            return res.status(400).json({
              message: "Cannot update role to 'Super Admin'. There is already at least one 'Super Admin' user.",
            });
          }
        }
        
        const user = await User.findByIdAndUpdate(userId, updatedUserFields, {
          new: true, 
          runValidators: true, 
        });
    
        if (!user) {
        
          return res.status(404).json({ message: "User not found." });
        }
    
        res.json({ message: "User updated successfully", user });
      } catch (error) {
       
        console.error("Error while updating user:", error);
        res.status(500).json({ message: "An error occurred while updating user." });
      }
   }

   const add_user = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      console.log("Request User:", req.user); 
  
     
      if (req.user.role === 'Super Admin') {
    
        const newUser = new User({
          username,
          email,
          password,
          role,
        });
  
   
        await newUser.save();
  
        res.json({ message: 'User added successfully', user: newUser });
      } else {
      
        res.status(403).json({ message: 'Only Super Admin can create users with roles other than Super Admin.' });
      }
    } catch (error) {
      console.error('Error while adding user:', error);
      res.status(500).json({ message: 'An error occurred while adding user.', error: error.message });
    }
  };

  const createUser =async (req ,res)=>{
    try {
      const { username, email, password, role } = req.body;
      console.log('Received request with:', { username, email, password, role });
  
   
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already registered' });
      }
  
     
      const newUser = new User({ username, email, password, role });
  
    
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error while creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  


module.exports={DeleteUser , EditUser , add_user ,createUser};