import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UserRound, CalendarDays, MapPin, Phone, Mail, ImagePlus, Save, User2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-toastify"

import NavSidebar from "../../components/ui/HomeNavbarandSidebar"
import ChangePassword from "./change-password"

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    dob: "",
    addressLine: "",
    city: "",
    state: "",
    mobileNo: "",
    email: "",
    profilePhoto: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const userDataString = localStorage.getItem("user")
        let userID
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          userID = userData._id
          if (userData.name && userData.email) {
            setProfile((prev) => ({
              ...prev,
              name: userData.name,
              email: userData.email,
            }))
          }
        }

        const res = await axios.post("http://localhost:3002/api/profile/getProfileData", {
          userID,
        }, {withCredentials: true})

        if (res.data.success) {
          const profileData = res.data.profile
          setProfile((prev) => ({
            ...prev,
            gender: profileData?.gender,
            dob: profileData?.dob,
            addressLine: profileData?.addressLine,
            city: profileData?.city,
            state: profileData?.state,
            mobileNo: profileData?.mobileNo,
            profilePhoto: profileData?.profilePhoto,
          }))
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
        toast({
          variant: "destructive",
          title: "Error fetching profile",
          description: "Could not load your profile information.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value) => {
    setProfile((prev) => ({ ...prev, gender: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image under 5MB.",
        })
        return
      }

      setSelectedFile(file)
      setFileName(file.name)
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const dataToSend = new FormData()
      const userDataString = localStorage.getItem("user")
      if (userDataString) {
        const userData = JSON.parse(userDataString)
        if (userData._id) dataToSend.append("userID", userData._id)
      }

      dataToSend.append("gender", profile.gender)
      dataToSend.append("dob", profile.dob)
      dataToSend.append("addressLine", profile.addressLine)
      dataToSend.append("city", profile.city)
      dataToSend.append("state", profile.state)
      dataToSend.append("mobileNo", profile.mobileNo)
      if (selectedFile) dataToSend.append("file", selectedFile)

      await axios.post("http://localhost:3002/api/profile/updateProfile", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success("Profile updated successfully.")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was a problem updating your profile.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavSidebar />
      <div className="container py-10 px-4 md:px-6 max-w-5xl mx-auto mt-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Account Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <User2 className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="w-full shadow-sm border border-slate-200">
              <CardHeader className="bg-slate-50 border-b py-6">
                <CardTitle className="text-2xl font-semibold text-slate-900">My Profile</CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Manage your personal information and contact details
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        {profileImage || profile.profilePhoto ? (
                          <AvatarImage src={profileImage || profile.profilePhoto} alt={profile.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">
                            {profile.name ? getInitials(profile.name) : "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-sm"
                        onClick={handleBrowseClick}
                      >
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-medium">{profile.name || "Your Name"}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email || "your.email@example.com"}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          type="button"
                          onClick={handleBrowseClick}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Change Photo
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
                    </div>
                  </div>

                  {/* Personal Info Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                            Full Name
                          </Label>
                          <Input id="name" name="name" value={profile.name} onChange={handleChange} className="h-10" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            Date of Birth
                          </Label>
                          <Input
                            id="dob"
                            type="date"
                            name="dob"
                            value={profile.dob}
                            onChange={handleChange}
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                            Gender
                          </Label>
                          <RadioGroup value={profile.gender} onValueChange={handleGenderChange} className="flex gap-6">
                            {["Male", "Female", "Other"].map((gender) => (
                              <div key={gender} className="flex items-center space-x-2">
                                <RadioGroupItem value={gender} id={`gender-${gender}`} />
                                <Label htmlFor={`gender-${gender}`} className="text-sm">
                                  {gender}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            Email Address
                          </Label>
                          <Input id="email" name="email" value={profile.email} readOnly className="h-10 bg-slate-50" />
                          <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobileNo" className="text-sm font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            Mobile Number
                          </Label>
                          <Input
                            id="mobileNo"
                            type="tel"
                            name="mobileNo"
                            value={profile.mobileNo}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="Enter your mobile number"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="addressLine" className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Street Address
                          </Label>
                          <Input
                            id="addressLine"
                            name="addressLine"
                            value={profile.addressLine}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="Enter your street address"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="Enter your city"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            State
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                            className="h-10"
                            placeholder="Enter your state"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex justify-end gap-4 py-6 bg-slate-50 border-t">
                <Button variant="outline" type="button" onClick={() => window.location.reload()}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="gap-2">
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="w-full shadow-sm border border-slate-200">
              <CardHeader className="bg-slate-50 border-b py-6">
                <CardTitle className="text-2xl font-semibold text-slate-900">Security Settings</CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <ChangePassword />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
