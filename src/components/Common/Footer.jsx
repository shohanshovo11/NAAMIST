import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-8">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/cfH5w7Gc23TnUndq/?mibextid=qi2Omg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-transform transform hover:scale-110 duration-300 ease-in-out"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-transform transform hover:scale-110 duration-300 ease-in-out"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-transform transform hover:scale-110 duration-300 ease-in-out"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-transform transform hover:scale-110 duration-300 ease-in-out"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              NAME Alumni Association of MIST
              <br />
              MIST, Mirpur Cantonment, Dhaka-1216, Bangladesh
              <br />
              Email:{" "}
              <a
                href="mailto:info@naamist.org"
                className="hover:text-secondary"
              >
                info@naamist.org
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+8801234567890" className="hover:text-secondary">
                +880 123 456 7890
              </a>
            </p>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-secondary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-secondary">
                  Events
                </a>
              </li>
              <li>
                <a href="/membership" className="hover:text-secondary">
                  Membership
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-secondary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © NAME Alumni Association of MIST. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
