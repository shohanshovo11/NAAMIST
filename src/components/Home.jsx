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
          <h2 className="text-4xl font-bold text-center mb-2 text-primary">
            Welcome to NAAMIST
          </h2>
          <h3 className="text-3xl font-light text-center mb-4">
            ( NAME Alumni Association of MIST )
          </h3>
          <p className="text-center text-gray-600">
            Graduates of the Naval Architecture and Marine Engineering
            department at the Military Institute of Science and Technology
            belong to an organized community of more than 7,000 alumni spanning
            across the globe. This incredible network, the MIST NAME Alumni
            Association, represents a powerful force for the advancement of the
            Institute and for its alumni.
          </p>
        </div>
      </div>
      <div className="py-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          JOIN THE LEGACY
        </h2>
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cards with primary color background and 80% opacity */}
            <div className="bg-primary bg-opacity-80 shadow-md rounded-lg px-4 py-8 flex flex-col items-center justify-center">
              <GiGraduateCap size={60} className="text-white mb-4" />{" "}
              {/* Adjust the icon size and color */}
              <h3 className="text-2xl font-semibold text-white mb-2">
                Membership
              </h3>
              <p className="text-white text-center font-extralight">
                Join the NAME Alumni Association of MIST to connect with fellow
                alumni, stay informed, and support the Institute.
              </p>
            </div>
            <div className="bg-primary bg-opacity-80 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
              <MdEvent size={60} className="text-white mb-4" />{" "}
              {/* Adjust the icon size and color */}
              <h3 className="text-2xl font-semibold text-white mb-2">Events</h3>
              <p className="text-white text-center font-extralight">
                Attend events, reunions, and networking opportunities to stay
                connected with the NAME community.
              </p>
            </div>
            <div className="bg-primary bg-opacity-80 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
              <MdSupport size={60} className="text-white mb-4" />{" "}
              {/* Adjust the icon size and color */}
              <h3 className="text-2xl font-semibold text-white mb-2">
                Support
              </h3>
              <p className="text-white text-center font-extralight">
                Contribute to the NAME Alumni Association of MIST to support
                scholarships, research, and other initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 mt-10 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 h-[1000px] md:h-[700px]">
          {/* Latest Events Section */}
          <div className="bg-white shadow-2xl rounded-xl px-8 pb-10 p-4 overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Latest Events
            </h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex space-x-4 items-center">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-1/3 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[16px] tracking-[.3px]">
                      {event.title}
                    </h3>
                    <p className="text-sm tracking-[.3px] leading-6 text-[#919FAE] ">
                      {event.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <h4 className="text-sm font-medium text-[#919FAE]">
                        Date: {event.date}
                      </h4>
                      <button className="text-primary hover:underline">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Section */}
          <div className="bg-white shadow-2xl rounded-md pl-8 pb-10 p-4 overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Announcements
            </h2>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="flex space-x-4 items-start">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="h-14 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-[#919FAE]">
                      Date: {announcement.date}
                    </h4>
                    <h3 className=" font-bold text-[16px] mt-1 text-[#0C101A]">
                      {announcement.title}
                    </h3>
                    <button className="text-primary hover:underline mt-1">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <QuoteSlider />

      <NameGallery />

      {/* <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Get Involved</h2>
          <p className="text-center text-lg font-extralight">
            The NAME Alumni Association of MIST offers a variety of ways to get
            involved and support the Institute. Whether you're interested in
            volunteering, attending events, or making a donation, there are
            opportunities for everyone to contribute to the NAME community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="w-2/3 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">
            Stay Connected
          </h2>
          <p className="text-center text-lg font-extralight">
            Connect with the NAME Alumni Association of MIST to stay informed
            about upcoming events, news, and opportunities to get involved.
          </p>
        </div>
      </div>

      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-lg font-extralight">
            Have questions or need assistance? Contact the NAME Alumni
            Association of MIST for more information about membership, events,
            and support opportunities.
          </p>
        </div>
      </div> */}
    </>
  );
}

export default Home;
