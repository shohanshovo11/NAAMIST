import HeroSection from "../Common/HeroSection";

const ContactUs = () => {
  return (
    <>
      <HeroSection
        title={"Contact Us"}
        imageUrl={
          "https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div className="max-w-screen-lg mx-auto p-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Feedback Form */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Feedback Form
            </h2>
            <form className="space-y-4">
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-black transition duration-200"
              >
                Send Feedback
              </button>
            </form>
          </div>

          {/* Location Iframe */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Location
            </h2>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1MZKGYqnztQJPknILOFjTvwvYoPQ&ehbc=2E312F"
              width="100%"
              height="380"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
