import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Axios from "../../utils/axios";
import Logo from "../../assets/NAAMIST-150-x-150-px.png";

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
  const [workSector, setWorkSector] = useState(""); // New Work Sector state
  const signIn = useSignIn();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      if (isRegister) {
        // Registration logic
        if (password !== confirmPassword) {
          console.error("Passwords do not match.");
          return;
        }
        const response = await Axios.post("/auth/register", {
          name,
          email,
          password,
          studentId,
          batch,
          enrollmentYear,
          completionYear,
          mobileNumber,
          currentWorkplace,
          designation,
          facebookLink,
          linkedinLink,
          workSector, // Include workSector in the registration data
          role: "alumni",
        });
        console.log("Registration successful:", response.data);
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
          console.log("Successfully signed in!");
          navigate("/");
        } else {
          console.error("Failed to sign in.");
        }
      }
    } catch (error) {
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
          className="absolute bottom-4 left-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-black transition duration-300"
        >
          Visit Us
        </button>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
        {isRegister ? (
          <>
            <h2 className="text-3xl font-semibold mb-6">Register as Alumni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
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
                  <option value="Higher Study">Defence</option>
                  <option value="Private">Private Sector</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
              />
              <div className="relative">
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
            </div>
          </>
        )}
        <button
          onClick={submitHandler}
          className="bg-primary text-white w-full max-w-sm py-3 rounded-lg mt-6 hover:bg-black transition duration-300"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>
        {/* {!isRegister && (
          <button
            onClick={() => console.log("Login with Google")}
            className="bg-red-500 text-white w-full max-w-sm py-3 rounded-lg mt-3 hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Login;
