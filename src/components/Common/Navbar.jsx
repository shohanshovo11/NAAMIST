import { useState, useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Members", path: "/members" },
  { name: "Events", path: "/events" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(location.pathname);
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  const handleLogout = () => {
    signOut(); // Perform the logout action
    setIsLoggedIn(false); // Update the authentication state
    navigate("/"); // Redirect to the home page or any other page
  };

  useEffect(() => {
    setActivePage(location.pathname); // Update the active page when the location changes
    setIsLoggedIn(isAuthenticated); // Update the logged-in state when the auth state changes
  }, [location, isAuthenticated]);

  return (
    <nav className="text-black p-4 max-w-screen-xl mx-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link
            to="/"
            className="hover:text-secondary transition-colors duration-300 text-primary font-extralight tracking-[.25em]"
          >
            NAAMIST
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className={`relative group ${
                activePage === page.path ? "text-secondary" : "text-black"
              }`}
              onClick={() => setActivePage(page.path)}
            >
              {page.name}
              <span
                className={`absolute rounded-md left-1/2 bottom-[-2px] w-0 h-1 bg-secondary transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                  activePage === page.path ? "w-full" : ""
                }`}
              ></span>
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`relative group py-2 ${
                  activePage === "/profile" ? "text-secondary" : "text-black"
                } transition-colors duration-300`}
                onClick={() => setActivePage("/profile")}
              >
                Profile
                <span
                  className={`absolute rounded-md left-1/2 bottom-[-2px] w-0 h-1 bg-secondary transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                    activePage === "/profile" ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/authentication"
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Login/Registration
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
