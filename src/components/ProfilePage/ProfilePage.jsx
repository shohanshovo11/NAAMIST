import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import defaultProfile from "../../assets/default_profile.png";
import HeroSection from "../Common/HeroSection";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Axios from "../../utils/axios";
import { message, Spin } from "antd";

const imgLink = import.meta.env.VITE_IMAGE_URL;
console.log(imgLink, "kkkj");
const ProfilePage = () => {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [selectedImage, setSelectedImage] = useState(null); // State to handle image selection
  const [newPassword, setNewPassword] = useState(""); // New password field
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [previewImage, setPreviewImage] = useState(null); // For previewing the selected image
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch profile data from backend when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get(`/alumni/${auth.id}`);
        if (response.status === 200) {
          setProfile(response.data);
        }
      } catch (error) {
        message.error("Failed to load profile data.");
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false); // Stop loading once the request is completed
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [auth, isAuthenticated]);

  // Handle input changes for profile fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle image selection for preview and upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Save the selected image to the state
      setPreviewImage(URL.createObjectURL(file)); // Create a temporary URL for image preview
    }
  };

  // Handle form submission to save the updated profile
  const handleSave = async () => {
    setLoading(true); // Start loading when saving profile
    const formData = new FormData();

    // Append all profile fields to FormData
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("enrollmentYear", profile.enrollmentYear);
    formData.append("completionYear", profile.completionYear);
    formData.append("studentID", profile.studentID);
    formData.append("batch", profile.batch);
    formData.append("mobile", profile.mobile);
    formData.append("workplace", profile.workplace);
    formData.append("designation", profile.designation);
    formData.append("facebook", profile.facebook);
    formData.append("linkedin", profile.linkedin);
    formData.append("workSectorType", profile.workSectorType); // Append work sector

    // Append the image if selected
    if (selectedImage) {
      formData.append("profilePic", selectedImage); // Append image as a file
    }

    // Append the new password only if it's provided and matches the confirmation
    if (newPassword && newPassword === confirmPassword) {
      formData.append("password", newPassword); // Append password
    }

    try {
      // Send the updated profile data to the backend
      const response = await Axios.put(`/alumni/update/${auth.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate headers
        },
      });

      if (response.status === 200) {
        // Update local state with the updated profile data
        setProfile(response.data);

        // Display a success message
        message.success("Profile updated successfully!");

        // Reset image preview and password fields after successful update
        setSelectedImage(null);
        setPreviewImage(null);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        message.error("Error updating profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-screen-md p-20 mx-auto">
        <h1 className="text-3xl font-semibold text-primary text-center">
          Please log in to view your profile
        </h1>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        imageUrl={
          "https://cdn.pixabay.com/photo/2016/07/08/13/37/texture-1504364_1280.jpg"
        }
        title={"Profile"}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        profile && (
          <div className="max-w-screen-md mx-auto p-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={
                  previewImage
                    ? previewImage
                    : profile.profilePic
                    ? `${imgLink}/${profile.profilePic}`
                    : defaultProfile
                }
                alt="Profile"
                className="w-56 h-56 rounded-full mb-4 object-cover"
              />
              <h1 className="text-3xl font-semibold text-primary">
                {profile.name}
              </h1>
            </div>

            {/* Profile Form */}
            <form className="space-y-4 flex flex-col">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Enrollment Year */}
              <div>
                <label
                  htmlFor="enrollmentYear"
                  className="block text-gray-700 font-medium"
                >
                  Enrollment Year
                </label>
                <input
                  type="number"
                  id="enrollmentYear"
                  name="enrollmentYear"
                  value={profile.enrollmentYear}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Completion Year */}
              <div>
                <label
                  htmlFor="completionYear"
                  className="block text-gray-700 font-medium"
                >
                  Completion Year
                </label>
                <input
                  type="number"
                  id="completionYear"
                  name="completionYear"
                  value={profile.completionYear}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Student ID */}
              <div>
                <label
                  htmlFor="studentID"
                  className="block text-gray-700 font-medium"
                >
                  Student ID
                </label>
                <input
                  type="number"
                  id="studentID"
                  name="studentID"
                  value={profile.studentID}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Batch */}
              <div>
                <label
                  htmlFor="batch"
                  className="block text-gray-700 font-medium"
                >
                  Batch
                </label>
                <input
                  type="number"
                  id="batch"
                  name="batch"
                  value={profile.batch}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 font-medium"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Workplace */}
              <div>
                <label
                  htmlFor="workplace"
                  className="block text-gray-700 font-medium"
                >
                  Workplace
                </label>
                <input
                  type="text"
                  id="workplace"
                  name="workplace"
                  value={profile.workplace}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-gray-700 font-medium"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Work Sector Type Dropdown */}
              <div>
                <label
                  htmlFor="workSectorType"
                  className="block text-gray-700 font-medium"
                >
                  Work Sector Type
                </label>
                <select
                  id="workSectorType"
                  name="workSectorType"
                  value={profile.workSectorType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Higher Study">Higher Study</option>
                  <option value="Defence">Defence</option>
                  <option value="Academician">Academician</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Facebook */}
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-gray-700 font-medium"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  value={profile.facebook}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-gray-700 font-medium"
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label
                  htmlFor="profilePic"
                  className="block text-gray-700 font-medium"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {newPassword &&
                  confirmPassword &&
                  newPassword !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-48 self-center mx-auto bg-primary text-white py-2 rounded-md hover:bg-black transition duration-200"
              >
                Save
              </button>
            </form>
          </div>
        )
      )}
    </>
  );
};

export default ProfilePage;
