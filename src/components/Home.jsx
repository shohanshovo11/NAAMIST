import HeroSlider from "./Common/HeroSlider";
import QuoteSlider from "./Common/QuoteSlider";
import NameGallery from "./Common/NameGallery";
import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// test
function Home() {
  const announcements = [
    {
      title: 'CALL FOR ARTICLES – "THE SAIL-2020 (5TH EDITION)"',
      date: new Date("2021-01-14"), // Date of the announcement
      description:
        'We are calling for articles, short stories, write-ups, and experiences for the 5th edition of "THE SAIL-2020", the annual magazine of the NAME department, MIST. Submission deadline: 20th February 2021. Please email your articles in MS Word/PDF format to rafi.mashrur@name.mist.ac.bd.',
      image: "/images/announcements/SAIL.png",
    },
    {
      title: "Alumni Reunion 2023",
      date: Date.now(),
      image: "/images/events/2/am_2.jpg",
    },
    {
      title: "NAME Alumni Reunion",
      date: Date.now(),
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Axios("/event/latest");
        console.log(response.data.events);
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleLearnMoreClick = (event) => {
    navigate(`/event/${event._id}`, {
      state: { eventContent: event.eventContent, cardImage: event.cardImage },
    });
  };

  return (
    <>
      <Helmet>
        <title>NAAMIST - NAME Alumni Association of MIST</title>
        <meta
          name="description"
          content="The NAME Alumni Association of MIST brings together alumni from the Naval Architecture and Marine Engineering department. Connect, network, and stay informed about the latest events and announcements."
        />
        <meta
          name="keywords"
          content="NAME Alumni, NAME MIST, Alumni Association, Naval Architecture and Marine Engineering, MIST NAME, Alumni Network, Alumni Reunion, Alumni Events, MIST Events"
        />
        <meta
          property="og:title"
          content="NAAMIST - NAME Alumni Association of MIST"
        />
        <meta
          property="og:description"
          content="Join the NAME Alumni Association of MIST to connect with fellow alumni, attend events, and grow your professional network."
        />
        <meta property="og:image" content="/images/announcements/SAIL.png" />
        <meta property="og:url" content="https://www.namealumnimist.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NAAMIST - NAME Alumni Association of MIST"
        />
        <meta
          name="twitter:description"
          content="Connect with alumni of the Naval Architecture and Marine Engineering department at MIST. Stay updated on events, reunions, and opportunities."
        />
        <meta name="twitter:image" content="/images/announcements/SAIL.png" />
        <link rel="canonical" href="https://naamist.mist.ac.bd/" />
      </Helmet>

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
            belong to an organized community of more than 150+ alumni spanning
            across the globe. This incredible network, the MIST NAME Alumni
            Association, represents a powerful force for the advancement of the
            Institute and for its alumni.
          </p>
        </div>
      </div>

      <div className="container mx-auto md:px-4 md:py-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          What's Happening
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white md:shadow-lg rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Latest Events
            </h3>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 md:p-6 space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <img
                      src={event?.cardImage}
                      alt={event?.title}
                      className="w-full md:w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                        {event?.title}
                      </h4>
                      <p className="text-sm md:text-base text-gray-600 mt-2">
                        {event?.description?.slice(0, 100)}...
                      </p>
                      <button
                        onClick={() => handleLearnMoreClick(event)}
                        className="text-primary hover:underline mt-2 text-sm md:text-base font-medium"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/events">
                <button className="bg-primary text-white px-6 py-2 rounded-md text-sm md:text-base font-medium hover:bg-primary-dark transition duration-300 hover:bg-black">
                  View All Events
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white md:shadow-lg rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Announcements
            </h3>
            <div className="space-y-6">
              {announcements.slice(0, 4).map((announcement, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 md:p-6 space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
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
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="bg-primary text-white px-6 py-2 rounded-md text-sm md:text-base font-medium hover:bg-primary-dark transition duration-300 hover:bg-black">
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
