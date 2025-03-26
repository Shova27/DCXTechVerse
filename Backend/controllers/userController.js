const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword, mobileNumber});
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Server error", error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User is not registered" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { 
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );
        

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: "Server error", error });
    }
};

const getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserData= async (req, res) => {
    try {
        const { add1, add2, city, state, zip } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    "address.add1": add1,
                    "address.add2": add2,
                    "address.city": city,
                    "address.state": state,
                    "address.zip": zip,
                }
            },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Server error" });
    }  
};
const logoutUser = (req,res)=>{

    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" }); // Clear JWT from cookies
    res.status(200).json({ message: "Logout successful" });

}
module.exports = { registerUser, loginUser, getUserByID, updateUserData, logoutUser };