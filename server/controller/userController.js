import User from "../model/userModel.js";
// create user
export const create= async(req, res) => {
    try{
        // Creates new User object using data provided in the request body (username, email, password, etc)
        const newUser= new User(req.body);

        // Extracts the email property specifically from the newUser
        const {email}= newUser;

        // checks if email exists
        const userExist= await User.findOne({email})

        // If a user with that email is found, sends a 400 Bad Request
        if(userExist){
            return res.status(400).json({message:'user already exists'});
        }

        // save new user to DB if they dont already exist.
        const savedData= await newUser.save();

        // Sends a 200 OK status
        // res.status(200).json(savedData);
        res.status(200).json({message:"User Created Successfully!"});

    } catch(error){
        res.status(500).json({errorMessage: error.message})
    }
};
//   get all users
export const getAllUsers= async(req, res) => {
    try {
        const userData= await User.find();

        if(!userData || userData.length === 0){
            return res.status(404).json({message: 'user data not found'});
        }

        return res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
};
export const getUserById= async(req, res)=>{
    try {
        const id= req.params.id;
        const userExist= await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: 'user data not found'});
        }

        return res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}
// update
export const update= async(req, res)=> {
    try {
        const id= req.params.id;
        const userExist= await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: 'user data not found'});
        }

        const updatedData= await User.findByIdAndUpdate(id, req.body, {
            new:true
        })

        //res.status(200).json(updatedData);
        res.status(200).json({message:"User Updated Successfully!"});
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}
// delete
export const deleteUser= async(req, res)=>{
    try {
        const id= req.params.id;
        const userExist= await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: 'user data not found'});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message: "user deleted successfully"})

    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}