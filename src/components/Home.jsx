import HeroSlider from "./Common/HeroSlider";
import { GiGraduateCap } from "react-icons/gi";
import { MdEvent, MdSupport } from "react-icons/md"; // Import icons for Events and Support
import QuoteSlider from "./Common/QuoteSlider";
import NameGallery from "./Common/NameGallery";

function Home() {
  const events = [
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      shortDescription:
        "Join us for the annual NAME Alumni Reunion at MIST in Dhaka. Reconnect with classmates, meet fellow alumni, and celebrate the NAME community.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Networking Event",
      date: Date.now(),
      shortDescription:
        "Connect with NAME alumni from around the world at our virtual networking event. Share your experiences, exchange ideas, and build new relationships.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Fundraiser",
      date: Date.now(),
      shortDescription:
        "Support the NAME Alumni Association of MIST by participating in our annual fundraiser. Your donations help fund scholarships, research, and other initiatives.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      shortDescription:
        "Join us for the annual NAME Alumni Reunion at MIST in Dhaka. Reconnect with classmates, meet fellow alumni, and celebrate the NAME community.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Networking Event",
      date: Date.now(),
      shortDescription:
        "Connect with NAME alumni from around the world at our virtual networking event. Share your experiences, exchange ideas, and build new relationships.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Fundraiser",
      date: Date.now(),
      shortDescription:
        "Support the NAME Alumni Association of MIST by participating in our annual fundraiser. Your donations help fund scholarships, research, and other initiatives.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      shortDescription:
        "Join us for the annual NAME Alumni Reunion at MIST in Dhaka. Reconnect with classmates, meet fellow alumni, and celebrate the NAME community.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Networking Event",
      date: Date.now(),
      shortDescription:
        "Connect with NAME alumni from around the world at our virtual networking event. Share your experiences, exchange ideas, and build new relationships.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Fundraiser",
      date: Date.now(),
      shortDescription:
        "Support the NAME Alumni Association of MIST by participating in our annual fundraiser. Your donations help fund scholarships, research, and other initiatives.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      shortDescription:
        "Join us for the annual NAME Alumni Reunion at MIST in Dhaka. Reconnect with classmates, meet fellow alumni, and celebrate the NAME community.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Networking Event",
      date: Date.now(),
      shortDescription:
        "Connect with NAME alumni from around the world at our virtual networking event. Share your experiences, exchange ideas, and build new relationships.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Fundraiser",
      date: Date.now(),
      shortDescription:
        "Support the NAME Alumni Association of MIST by participating in our annual fundraiser. Your donations help fund scholarships, research, and other initiatives.",
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const announcements = [
    {
      title: "New Scholarship Opportunity",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Research Grant Applications Open",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Association of MIST Annual Meeting",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Networking Event",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "NAME Alumni Fundraiser",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <>
      <HeroSlider />
      <div className="container mx-auto px-4 py-8">
        <div className="md:w-2/3 md:mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
            Welcome to NAAMIST
          </h2>
          <h3 className="text-xl md:text-2xl font-light text-center mb-4">
            ( NAME Alumni Association of MIST )
          </h3>
          <p className="text-center text-gray-600 text-sm md:text-base">
            Graduates of the Naval Architecture and Marine Engineering
            department at the Military Institute of Science and Technology
            belong to an organized community of more than 7,000 alumni spanning
            across the globe. This incredible network, the MIST NAME Alumni
            Association, represents a powerful force for the advancement of the
            Institute and for its alumni.
          </p>
        </div>
      </div>

      {/* Improved Latest Events and Announcements Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          What's Happening
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Latest Events Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Latest Events
            </h3>
            <div className="space-y-6">
              {events.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                      {event.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                      {event.shortDescription.slice(0, 100)}...
                    </p>
                    <button className="text-primary hover:underline mt-2 text-sm md:text-base font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="bg-primary text-white px-6 py-2 rounded-md text-sm md:text-base font-medium hover:bg-primary-dark transition duration-300">
                View All Events
              </button>
            </div>
          </div>

          {/* Announcements Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Announcements
            </h3>
            <div className="space-y-6">
              {announcements.slice(0, 4).map((announcement, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
                >
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full md:w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                      {announcement.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                      Date: {new Date(announcement.date).toLocaleDateString()}
                    </p>
                    <button className="text-primary hover:underline mt-2 text-sm md:text-base font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="bg-primary text-white px-6 py-2 rounded-md text-sm md:text-base font-medium hover:bg-primary-dark transition duration-300 ">
                View All Announcements
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuoteSlider />

      <NameGallery />
    </>
  );
}

export default Home;
