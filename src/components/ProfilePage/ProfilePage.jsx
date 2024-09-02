import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import defaultProfile from "../../assets/default_profile.png";

const profileData = {
  name: "Bodda",
  email: "bodda@gmail.com",
  enrollmentYear: 2021,
  completionYear: 2025,
  studentID: 202114094,
  batch: 21,
  mobile: "01234567809",
  workplace: "google",
  designation: "senior soft dev",
  facebook: "facebook",
  linkedin: "linkedin",
};

const ProfilePage = () => {
  const auth = useAuthUser();
  console.log(auth, "shohvo");
  const [profile, setProfile] = useState(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Logic to save the updated profile data
    console.log("Profile saved:", profile);
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={`${
            profile.imgUrl === "" || !profile.imgUrl
              ? defaultProfile
              : profile.imgUrl
          }`}
          alt="Profile"
          className="w-56 h-56 rounded-full mb-4"
        />
        <h1 className="text-3xl font-semibold text-primary">{profile.name}</h1>
      </div>

      {/* Profile Form */}
      <form className="space-y-4 flex flex-col">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
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

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
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

        <div>
          <label htmlFor="batch" className="block text-gray-700 font-medium">
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

        <div>
          <label htmlFor="mobile" className="block text-gray-700 font-medium">
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

        <div>
          <label htmlFor="facebook" className="block text-gray-700 font-medium">
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

        <div>
          <label htmlFor="linkedin" className="block text-gray-700 font-medium">
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

        <button
          type="button"
          onClick={handleSave}
          className="w-48 self-center mx-auto bg-primary text-white py-2 rounded-md hover:bg-black transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
