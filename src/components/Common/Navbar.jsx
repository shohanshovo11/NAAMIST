import { useState, useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const pages = [
  { name: "Home", path: "/" },
  { name: "Members", path: "/members" },
  { name: "Events", path: "/events" },
  { name: "Announcements", path: "/announcements" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(); // Perform the logout action
    setIsLoggedIn(false); // Update the authentication state
    navigate("/"); // Redirect to the home page or any other page
  };

  useEffect(() => {
    setActivePage(location.pathname); // Update the active page when the location changes
    setIsLoggedIn(isAuthenticated); // Update the logged-in state when the auth state changes
  }, [location, isAuthenticated]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className="text-2xl text-primary">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
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
                className={`relative group ${
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

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 ${
            menuOpen ? "z-20" : "z-[-1]"
          } transition-opacity duration-300 ease-in-out md:hidden`}
          style={{ opacity: menuOpen ? 1 : 0 }}
        >
          <div
            className={`bg-white w-64 h-full p-6 absolute right-0 top-0 shadow-lg transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {pages.map((page) => (
              <Link
                key={page.name}
                to={page.path}
                className={`block text-lg mb-4 ${
                  activePage === page.path ? "text-secondary" : "text-black"
                }`}
                onClick={() => {
                  setActivePage(page.path);
                  toggleMenu();
                }}
              >
                {page.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`block text-lg mb-4 ${
                    activePage === "/profile" ? "text-secondary" : "text-black"
                  }`}
                  onClick={() => {
                    setActivePage("/profile");
                    toggleMenu();
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/authentication"
                className="block w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={toggleMenu}
              >
                Login/Registration
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
