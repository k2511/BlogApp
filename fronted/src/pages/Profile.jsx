// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";
// import user from "../assets/user.jpg";
// import React, { useState } from "react";
// import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { FaLinkedin } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useDispatch, useSelector } from "react-redux";
// import store from "@/redux/store";
// import { setLoading, setUser } from "@/redux/authSlice";
// import axios from "axios";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import TotalProperty from "@/components/TotalProperty";

// const Profile = () => {
//   const { user, loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     occupation: user?.occupation || "",
//     bio: user?.bio || "",
//     facebook: user?.facebook || "",
//     linkedin: user?.linkedin || "",
//     gitHub: user?.gitHub || "",
//     instagram: user?.instagram || "",
//     file: null,
//   });

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // Check if user exists
//     if (!user || !user._id) {
//       toast.error("User not found");
//       return;
//     }

//     const formData = new FormData();

//     // Properly append all fields
//     formData.append("firstName", input.firstName || "");
//     formData.append("lastName", input.lastName || "");
//     formData.append("bio", input.bio || "");
//     formData.append("occupation", input.occupation || "");
//     formData.append("facebook", input.facebook || "");
//     formData.append("gitHub", input.gitHub || ""); // Note: lowercase 'g' in gitHub
//     formData.append("linkedin", input.linkedin || "");
//     formData.append("instagram", input.instagram || "");

//     if (input?.file) {
//       formData.append("file", input.file);
//     }

//     console.log("Form Data:", {
//       firstName: input.firstName,
//       lastName: input.lastName,
//       bio: input.bio,
//       occupation: input.occupation,
//       facebook: input.facebook,
//       gitHub: input.gitHub,
//       linkedin: input.linkedin,
//       instagram: input.instagram,
//       file: input.file?.name || "No file",
//     });

//     try {
//       dispatch(setLoading(true));

//       const res = await axios.put(
//         `http://localhost:8000/api/v1/user/profile`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         },
//       );

//       if (res.data.success) {
//         setOpen(false);
//         toast.success(res.data.message);
//         dispatch(setUser(res.data.user));

//         // Reset file input after successful upload
//         setInput((prev) => ({ ...prev, file: null }));
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   // Update input when user changes
//   React.useEffect(() => {
//     if (user) {
//       setInput({
//         firstName: user?.firstName || "",
//         lastName: user?.lastName || "",
//         occupation: user?.occupation || "",
//         bio: user?.bio || "",
//         facebook: user?.facebook || "",
//         linkedin: user?.linkedin || "",
//         gitHub: user?.gitHub || "",
//         instagram: user?.instagram || "",
//         file: null,
//       });
//     }
//   }, [user]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8 lg:ml-[250px] min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-8">
//         {/* Main Profile Card */}
//         <Card className="w-full bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl rounded-2xl">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
//             {/* Left Section - Avatar & Social */}
//             <div className="flex flex-col items-center lg:items-start lg:w-1/3">
//               <div className="relative group">
//                 <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white dark:border-gray-700 shadow-lg">
//                   <AvatarImage 
//                     src={user?.photoUrl || user} 
//                     className="object-cover"
//                   />
//                 </Avatar>
//                 <div className="absolute inset-0 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
              
//               <h1 className="text-center lg:text-left font-bold text-xl sm:text-2xl text-gray-800 dark:text-white mt-4">
//                 {user?.firstName || "User"} {user?.lastName || ""}
//               </h1>
              
//               <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-blue-50 dark:bg-gray-700 rounded-full">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
//                   {user?.occupation || "MERN Stack Developer"}
//                 </span>
//               </div>

//               {/* Social Links */}
//               <div className="flex gap-4 items-center mt-6">
//                 {user?.facebook && (
//                   <Link 
//                     to={user.facebook} 
//                     target="_blank"
//                     className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
//                   >
//                     <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//                   </Link>
//                 )}
//                 {user?.linkedin && (
//                   <Link 
//                     to={user.linkedin} 
//                     target="_blank"
//                     className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
//                   >
//                     <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//                   </Link>
//                 )}
//                 {user?.gitHub && (
//                   <Link 
//                     to={user.gitHub} 
//                     target="_blank"
//                     className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
//                   >
//                     <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-300 group-hover:scale-110 transition-transform" />
//                   </Link>
//                 )}
//                 {user?.instagram && (
//                   <Link 
//                     to={user.instagram} 
//                     target="_blank"
//                     className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
//                   >
//                     <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Right Section - Profile Info */}
//             <div className="flex-1">
//               {/* Welcome Header */}
//               <div className="mb-6 md:mb-8">
//                 <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white text-center lg:text-left">
//                   Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.firstName || "User"}!</span>
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-2 text-center lg:text-left">
//                   Manage your profile and personal information
//                 </p>
//               </div>

//               {/* Email Info */}
//               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</p>
//                     <p className="text-base font-semibold text-gray-800 dark:text-white">{user?.email}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Bio Section */}
//               <div className="mb-8">
//                 <Label className="text-lg font-semibold text-gray-800 dark:text-white mb-3 block">
//                   About Me
//                 </Label>
//                 <div className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/30 shadow-sm">
//                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                     {user?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
//                   </p>
//                 </div>
//               </div>

//               {/* Edit Profile Button */}
//               <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogTrigger asChild>
//                   <Button 
//                     onClick={() => setOpen(true)}
//                     className="w-full sm:w-auto bg-gray-800 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
//                   >
//                     Edit Profile
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//                       Edit Profile
//                     </DialogTitle>
//                     <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
//                       Update your personal information and social links
//                     </DialogDescription>
//                   </DialogHeader>
//                   <form onSubmit={submitHandler} className="mt-4">
//                     <div className="space-y-5">
//                       {/* Name Fields */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="firstName" className="font-medium text-gray-700 dark:text-gray-300">
//                             First Name
//                           </Label>
//                           <Input
//                             id="firstName"
//                             name="firstName"
//                             placeholder="Enter first name"
//                             type="text"
//                             className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                             value={input.firstName}
//                             onChange={changeEventHandler}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="lastName" className="font-medium text-gray-700 dark:text-gray-300">
//                             Last Name
//                           </Label>
//                           <Input
//                             id="lastName"
//                             name="lastName"
//                             placeholder="Enter last name"
//                             className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                             value={input.lastName}
//                             onChange={changeEventHandler}
//                           />
//                         </div>
//                       </div>

//                       {/* Occupation */}
//                       <div className="space-y-2">
//                         <Label htmlFor="occupation" className="font-medium text-gray-700 dark:text-gray-300">
//                           Occupation
//                         </Label>
//                         <Input
//                           id="occupation"
//                           name="occupation"
//                           placeholder="e.g., MERN Stack Developer"
//                           className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                           value={input.occupation}
//                           onChange={changeEventHandler}
//                         />
//                       </div>

//                       {/* Social Links Grid */}
//                       <div className="space-y-4">
//                         <h3 className="font-medium text-gray-700 dark:text-gray-300">Social Links</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="facebook" className="flex items-center gap-2">
//                               <FaFacebook className="text-blue-600" />
//                               Facebook
//                             </Label>
//                             <Input
//                               id="facebook"
//                               name="facebook"
//                               placeholder="https://facebook.com/username"
//                               className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                               value={input.facebook}
//                               onChange={changeEventHandler}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="instagram" className="flex items-center gap-2">
//                               <FaInstagram className="text-pink-600" />
//                               Instagram
//                             </Label>
//                             <Input
//                               id="instagram"
//                               name="instagram"
//                               placeholder="https://instagram.com/username"
//                               className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                               value={input.instagram}
//                               onChange={changeEventHandler}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="linkedin" className="flex items-center gap-2">
//                               <FaLinkedin className="text-blue-700" />
//                               LinkedIn
//                             </Label>
//                             <Input
//                               id="linkedin"
//                               name="linkedin"
//                               placeholder="https://linkedin.com/in/username"
//                               className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                               value={input.linkedin}
//                               onChange={changeEventHandler}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="gitHub" className="flex items-center gap-2">
//                               <FaGithub className="text-gray-800 dark:text-gray-300" />
//                               GitHub
//                             </Label>
//                             <Input
//                               id="gitHub"
//                               name="gitHub"
//                               placeholder="https://github.com/username"
//                               className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                               value={input.gitHub}
//                               onChange={changeEventHandler}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Bio */}
//                       <div className="space-y-2">
//                         <Label htmlFor="bio" className="font-medium text-gray-700 dark:text-gray-300">
//                           Bio
//                         </Label>
//                         <Textarea
//                           id="bio"
//                           name="bio"
//                           placeholder="Tell us about yourself..."
//                           className="min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                           value={input.bio}
//                           onChange={changeEventHandler}
//                         />
//                       </div>

//                       {/* Profile Picture Upload */}
//                       <div className="space-y-2">
//                         <Label htmlFor="file" className="font-medium text-gray-700 dark:text-gray-300">
//                           Profile Picture
//                         </Label>
//                         <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
//                           <Input
//                             id="file"
//                             type="file"
//                             accept="image/*"
//                             onChange={changeFileHandler}
//                             className="hidden"
//                           />
//                           <label htmlFor="file" className="cursor-pointer">
//                             <div className="flex flex-col items-center justify-center gap-2">
//                               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                               </svg>
//                               <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 {input.file ? input.file.name : "Click to upload profile picture"}
//                               </span>
//                             </div>
//                           </label>
//                         </div>
//                         {input.file && (
//                           <p className="text-sm text-green-600 dark:text-green-400 mt-2">
//                             ✓ Selected: {input.file.name}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <DialogFooter className="mt-6">
//                       <Button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//                             Updating Profile...
//                           </>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </Card>
//       </div>
//       <TotalProperty/>
//     </div>
//   );
// };

// export default Profile;



import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import userImg from "../assets/user.jpg"; // Changed variable name to avoid conflict
import React, { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TotalProperty from "@/components/TotalProperty";

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  
  // Initialize input state properly
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    bio: "",
    facebook: "",
    linkedin: "",
    gitHub: "",
    instagram: "",
    file: null,
  });

  // Initialize input when component mounts
  React.useEffect(() => {
    if (user) {
      setInput({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        occupation: user?.occupation || "",
        bio: user?.bio || "",
        facebook: user?.facebook || "",
        linkedin: user?.linkedin || "",
        gitHub: user?.gitHub || "",
        instagram: user?.instagram || "",
        file: null,
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if user exists
    if (!user || !user._id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    const formData = new FormData();

    // Append user ID for backend reference
    formData.append("userId", user._id);
    
    // Properly append all fields
    formData.append("firstName", input.firstName.trim() || "");
    formData.append("lastName", input.lastName.trim() || "");
    formData.append("bio", input.bio.trim() || "");
    formData.append("occupation", input.occupation.trim() || "");
    formData.append("facebook", input.facebook.trim() || "");
    formData.append("gitHub", input.gitHub.trim() || "");
    formData.append("linkedin", input.linkedin.trim() || "");
    formData.append("instagram", input.instagram.trim() || "");

    if (input?.file) {
      formData.append("profilePicture", input.file); // Changed from "file" to "profilePicture"
    }

    console.log("Form Data Details:");
    console.log("User ID:", user._id);
    console.log("First Name:", input.firstName);
    console.log("File:", input.file?.name);
    
    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message || "Profile updated successfully!");
        dispatch(setUser(res.data.user));

        // Reset file input after successful upload
        setInput((prev) => ({ ...prev, file: null }));
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("Full Error Details:", error);
      
      // Better error handling
      if (error.response) {
        // Server responded with error status
        console.log("Error Status:", error.response.status);
        console.log("Error Data:", error.response.data);
        
        if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else if (error.response.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to update profile");
        }
      } else if (error.request) {
        // Request was made but no response
        console.log("No response received:", error.request);
        toast.error("No response from server. Check your connection.");
      } else {
        // Something else happened
        console.log("Error Message:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:ml-[250px] min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-8">
        {/* Main Profile Card */}
        <Card className="w-full bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl rounded-2xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Section - Avatar & Social */}
            <div className="flex flex-col items-center lg:items-start lg:w-1/3">
              <div className="relative group">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white dark:border-gray-700 shadow-lg">
                  {/* FIXED: Use user.photoUrl or default image */}
                  <AvatarImage 
                    src={user?.photoUrl || userImg} 
                    alt={`${user?.firstName || "User"}'s profile`}
                    className="object-cover"
                  />
                </Avatar>
                <div className="absolute inset-0 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h1 className="text-center lg:text-left font-bold text-xl sm:text-2xl text-gray-800 dark:text-white mt-4">
                {user?.firstName || "User"} {user?.lastName || ""}
              </h1>
              
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-blue-50 dark:bg-gray-700 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {user?.occupation || "MERN Stack Developer"}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 items-center mt-6">
                {user?.facebook && (
                  <Link 
                    to={user.facebook} 
                    target="_blank"
                    className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                  >
                    <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {user?.linkedin && (
                  <Link 
                    to={user.linkedin} 
                    target="_blank"
                    className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                  >
                    <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {user?.gitHub && (
                  <Link 
                    to={user.gitHub} 
                    target="_blank"
                    className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                  >
                    <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {user?.instagram && (
                  <Link 
                    to={user.instagram} 
                    target="_blank"
                    className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                  >
                    <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Section - Profile Info */}
            <div className="flex-1">
              {/* Welcome Header */}
              <div className="mb-6 md:mb-8">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white text-center lg:text-left">
                  Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.firstName || "User"}!</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-center lg:text-left">
                  Manage your profile and personal information
                </p>
              </div>

              {/* Email Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</p>
                    <p className="text-base font-semibold text-gray-800 dark:text-white">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-gray-800 dark:text-white mb-3 block">
                  About Me
                </Label>
                <div className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/30 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {user?.bio || "No bio added yet. Add a bio to tell people about yourself!"}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => setOpen(true)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                      Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
                      Update your personal information and social links
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitHandler} className="mt-4">
                    <div className="space-y-5">
                      {/* Name Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="font-medium text-gray-700 dark:text-gray-300">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            type="text"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={input.firstName}
                            onChange={changeEventHandler}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="font-medium text-gray-700 dark:text-gray-300">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={input.lastName}
                            onChange={changeEventHandler}
                            required
                          />
                        </div>
                      </div>

                      {/* Occupation */}
                      <div className="space-y-2">
                        <Label htmlFor="occupation" className="font-medium text-gray-700 dark:text-gray-300">
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          placeholder="e.g., MERN Stack Developer"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={input.occupation}
                          onChange={changeEventHandler}
                        />
                      </div>

                      {/* Social Links Grid */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 dark:text-gray-300">Social Links</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="facebook" className="flex items-center gap-2">
                              <FaFacebook className="text-blue-600" />
                              Facebook
                            </Label>
                            <Input
                              id="facebook"
                              name="facebook"
                              placeholder="https://facebook.com/username"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              value={input.facebook}
                              onChange={changeEventHandler}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="instagram" className="flex items-center gap-2">
                              <FaInstagram className="text-pink-600" />
                              Instagram
                            </Label>
                            <Input
                              id="instagram"
                              name="instagram"
                              placeholder="https://instagram.com/username"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              value={input.instagram}
                              onChange={changeEventHandler}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="flex items-center gap-2">
                              <FaLinkedin className="text-blue-700" />
                              LinkedIn
                            </Label>
                            <Input
                              id="linkedin"
                              name="linkedin"
                              placeholder="https://linkedin.com/in/username"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              value={input.linkedin}
                              onChange={changeEventHandler}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gitHub" className="flex items-center gap-2">
                              <FaGithub className="text-gray-800 dark:text-gray-300" />
                              GitHub
                            </Label>
                            <Input
                              id="gitHub"
                              name="gitHub"
                              placeholder="https://github.com/username"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              value={input.gitHub}
                              onChange={changeEventHandler}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us about yourself..."
                          className="min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={input.bio}
                          onChange={changeEventHandler}
                        />
                      </div>

                      {/* Profile Picture Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="file" className="font-medium text-gray-700 dark:text-gray-300">
                          Profile Picture
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                          <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="hidden"
                          />
                          <label htmlFor="file" className="cursor-pointer">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {input.file ? input.file.name : "Click to upload profile picture (max 5MB)"}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Supports: JPG, PNG, GIF
                              </span>
                            </div>
                          </label>
                        </div>
                        {input.file && (
                          <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Selected: {input.file.name} ({(input.file.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Updating Profile...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      </div>
      <TotalProperty/>
    </div>
  );
};

export default Profile;