const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
      },
  gender: {
    type: String, // Fixed incorrect type declaration
    
  },
  dob: {
    type: Date,
   
  },
  address_line: { // Fixed typo in "adddress_line"
    type: String,
    
  },
  city: {
    type: String,
   
  },
  state: {
    type: String,
    
  },
  profile_photo: {
    type: String, // Store the URL or file path of the profile photo
  },
  mobileNo: {
    type: String, // Changed from Number to String to handle leading zeros
   
    unique: true, // Ensures no duplicate mobile numbers
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
