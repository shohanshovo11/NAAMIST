import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Axios from "../../utils/axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await Axios.post("/auth/login", {
        email,
        password,
        role: "admin",
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
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        console.error("Failed to sign in.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-700">
                Admin Login
              </h1>
            </div>
            <div className="mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-6"
              />
              <button
                onClick={loginHandler}
                className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary transition duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
