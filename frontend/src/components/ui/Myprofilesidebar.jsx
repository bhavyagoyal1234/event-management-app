import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserIcon, CalendarIcon, MapPinIcon, PhoneIcon, MailIcon, CameraIcon } from 'lucide-react';

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        gender: '',
        dob: '',
        addressLine: '',
        city: '',
        state: '',
        mobileNo: '',
        email: '',
        profilePhoto: '',
    });

    useEffect(() => {
        console.log("profile ",profile);
    }, [profile])

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Retrieve user data from localStorage
                const userDataString = localStorage.getItem('user');
                let userID;
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    userID = userData._id;
                    if (userData.name && userData.email) {
                        setProfile((prevProfile) => ({
                            ...prevProfile,
                            name: userData.name,
                            email: userData.email,
                        }));
                    }
                } else {
                    console.error('User data is missing in localStorage');
                }

                // Fetch additional profile data
                const profileResponse = await axios.post("http://localhost:3002/api/profile/getProfileData", {
                    userID: userID,
                });

                const profileData = profileResponse.data.profile;
                // console.log(profileData, 'profiledata')

                if(profileResponse.data.success){
                    console.log("profiledata",profileData)
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        gender: profileData.gender ,
                        dob: profileData.dob,
                        addressLine: profileData.addressLine ,
                        city: profileData.city ,
                        state: profileData.state ,
                        mobileNo: profileData.mobileNo ,
                        profilePhoto: profileData.profilePhoto,
                    }));
                }

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : "");
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        } else {
            setProfileImage(null);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = new FormData();

            // Retrieve user data from localStorage
            const userDataString = localStorage.getItem('user');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                if (userData._id) {
                    dataToSend.append("userID", userData._id);
                }
            }

            // Append other profile data
            dataToSend.append("gender", profile.gender);
            dataToSend.append("dob", profile.dob);
            dataToSend.append("addressLine", profile.addressLine);
            dataToSend.append("city", profile.city);
            dataToSend.append("state", profile.state);
            dataToSend.append("mobileNo", profile.mobileNo);
            if (selectedFile) {
                dataToSend.append("file", selectedFile);
            }

            dataToSend.forEach((value, key) => {
                console.log(key, value);
              });
            
            await axios.post("http://localhost:3002/api/profile/updateProfile", dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto border shadow-md mt-6">
            <CardHeader className="bg-muted/40 border-b">
                <CardTitle className="text-2xl font-semibold text-primary">
                    My Profile
                </CardTitle>
                <CardDescription>
                    Manage your personal and account information
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <h3 className="font-bold mb-4">PERSONAL INFORMATION</h3>
                        <div className="mb-6 flex flex-col items-center">
                            <div className="flex flex-col items-center">
                                {profileImage || profile.profilePhoto ? (
                                    <img
                                        src={profileImage || profile.profilePhoto}
                                        alt="Profile"
                                        className="w-42 h-42 rounded-full mb-2"
                                    />
                                ) : (
                                    <div className="w-42 h-42 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                        <CameraIcon className="w-10 h-10 text-gray-500" />
                                    </div>
                                )}
                                <button type="button" className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 px-4 py-2 rounded" onClick={handleBrowseClick}>
                                    Change Photo
                                </button>
                                <input
                                    type="file"
                                    name="profilePhoto"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                                {fileName && <p className="mt-2 text-sm text-gray-600">{fileName}</p>}
                            </div>
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <UserIcon className="w-4 h-4 mr-1" />
                                Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <UserIcon className="w-4 h-4 mr-1" />
                                Gender
                            </Label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={profile.gender === 'Male'}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">Male</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={profile.gender === 'Female'}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">Female</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={profile.gender === 'Other'}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">Other</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Date of Birth
                            </Label>
                            <Input
                                type="date"
                                name="dob"
                                value={profile.dob}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                Address Line
                            </Label>
                            <Input
                                type="text"
                                name="addressLine"
                                value={profile.addressLine}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                City
                            </Label>
                            <Input
                                type="text"
                                name="city"
                                value={profile.city}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                State
                            </Label>
                            <Input
                                type="text"
                                name="state"
                                value={profile.state}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold mb-4">ACCOUNT INFORMATION</h3>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <MailIcon className="w-4 h-4 mr-1" />
                                Email Address
                            </Label>
                            <Input
                                type="text"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                readOnly
                            />
                        </div>
                        <div className="mb-6">
                            <Label className="flex items-center mb-2">
                                <PhoneIcon className="w-4 h-4 mr-1" />
                                Mobile No.
                            </Label>
                            <Input
                                type="number"
                                name="mobileNo"
                                value={profile.mobileNo}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Save Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default Profile;