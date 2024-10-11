import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Axios from "../../utils/axios";
import Logo from "../../assets/NAAMIST-150-x-150-px.png";
import { notification } from "antd";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [batch, setBatch] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [completionYear, setCompletionYear] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [designation, setDesignation] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [workSector, setWorkSector] = useState(""); // Work Sector state
  const [profilePic, setProfilePic] = useState(null); // State for Profile Pic
  const signIn = useSignIn();
  const navigate = useNavigate();

  // Handle profile picture file selection
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Store the selected file
  };

  // Form submission handler
  const submitHandler = async () => {
    try {
      if (isRegister) {
        // Registration logic
        if (password !== confirmPassword) {
          notification.error({
            message: "Registration Error",
            description: "Passwords do not match.",
          });
          return;
        }
        // Create FormData and append all form fields including profilePic
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("studentID", studentId);
        formData.append("batch", batch);
        formData.append("enrollmentYear", enrollmentYear);
        formData.append("completionYear", completionYear);
        formData.append("mobile", mobileNumber);
        formData.append("workplace", currentWorkplace);
        formData.append("designation", designation);
        formData.append("facebook", facebookLink);
        formData.append("linkedin", linkedinLink);
        formData.append("workSectorType", workSector);
        formData.append("isAuthorized", false);
        if (profilePic) formData.append("profilePic", profilePic);

        const response = await Axios.post("/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        notification.success({
          message: "Registration Successful",
          description: "You have been successfully registered!",
        });
        setIsRegister(false);
      } else {
        // Login logic
        const response = await Axios.post("/auth/login", {
          email,
          password,
          role: "alumni",
        });
        const { token, role, user } = response.data;
        const success = signIn({
          token,
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: {
            id: user?._id,
            role: role,
            token: token,
          },
        });

        if (success) {
          notification.success({
            message: "Login Successful",
            description: "You have successfully signed in!",
          });
          navigate("/");
        } else {
          notification.error({
            message: "Login Error",
            description: "Failed to sign in. Please try again.",
          });
        }
      }
    } catch (error) {
      notification.error({
        message: "Submission Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Column */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-indigo-700 flex flex-col justify-center items-center p-10 text-white relative">
        <img src={Logo} alt="Logo" className="mb-4 w-32 h-32" />
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="mb-6 text-lg">
          {isRegister
            ? "Create your account to get started."
            : "Sign in to your account"}
        </p>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition duration-300"
        >
          {isRegister ? "Sign In" : "Register"}
        </button>

        {/* Visit Us Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 md:bottom-4 md:left-4 md:top-auto md:right-auto bg-primary text-white px-6 py-2 rounded-full hover:bg-black transition duration-300"
        >
          Go Back
        </button>
      </div>

      {/* Right Column with scrollable registration content */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 overflow-y-auto max-h-screen">
        {isRegister ? (
          <>
            <h2 className="text-3xl font-semibold mb-6 mt-16">
              Register as Alumni
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
              {/* Form fields */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Batch"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={enrollmentYear}
                onChange={(e) => setEnrollmentYear(e.target.value)}
                placeholder="Enrollment Year"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={completionYear}
                onChange={(e) => setCompletionYear(e.target.value)}
                placeholder="Completion Year"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={currentWorkplace}
                onChange={(e) => setCurrentWorkplace(e.target.value)}
                placeholder="Current Workplace"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Designation"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="Facebook Link"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <input
                  type="url"
                  value={linkedinLink}
                  onChange={(e) => setLinkedinLink(e.target.value)}
                  placeholder="LinkedIn Link"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={workSector}
                  onChange={(e) => setWorkSector(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Work Sector
                  </option>
                  <option value="Higher Study">Higher Study</option>
                  <option value="Government">Government</option>
                  <option value="Defence">Defence</option>
                  <option value="Private">Private Sector</option>
                  <option value="Academician">Academician</option>
                  <option value="Others">Other</option>
                </select>
              </div>

              {/* Profile Picture Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative col-span-1 md:col-span-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xl text-gray-500 focus:outline-none"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              <div className="relative col-span-1 md:col-span-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 text-xl text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  autoComplete="current-password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xl text-gray-500 focus:outline-none"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>
          </>
        )}
        <button
          onClick={submitHandler}
          className="bg-primary text-white w-full max-w-sm py-3 rounded-lg mt-6 hover:bg-black transition duration-300"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
