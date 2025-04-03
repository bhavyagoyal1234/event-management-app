const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();



exports.updateProfile = async (req, res) => {
    try {
        console.log("in update profile controller");
        const { gender, dob, addressLine, city, state, mobileNo, userID } = req.body;
        const profilePhoto = req.file // Assuming profile photo is uploaded as a file
        console.log("priting image 😂",profilePhoto);
        // Check if userID is provided
        console.log("userID",userID);
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Create an object with the updated fields
        const updatedFields = {
            gender,
            dob,
            addressLine,
            city,
            state,
            mobileNo,
            profilePhoto
        };

        // Add profilePhoto if it is uploaded
        if (profilePhoto) {
            console.log("priting image 😂",profilePhoto);
            const image = await uploadImageToCloudinary(
                profilePhoto,
                process.env.PROFILE_IMAGES
            );
            updatedFields.profilePhoto = image.secure_url;
        }

        // Find and update profile
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: userID }, // Assuming Profile model has a `user` field referencing User
            updatedFields,
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile,
        });

    } catch (error) {
       console.log("printing error",error); 
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating Profile",
        });
    }
};

exports.getProfileData = async(req,res) =>{
    try{
        const {userID}=req.body;
        console.log("userID",userID);
        const profile=await Profile.findOne({user:userID});

        return res.status(200).json({
            success:true,
            message:"successfully fetched data of profile",
            profile
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"something went wrong while fetching profile data"
        })
    }
}