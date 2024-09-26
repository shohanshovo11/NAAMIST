import { useState, useEffect } from "react";
import HeroSection from "../Common/HeroSection";
import EventCard from "./EventCard";
import Axios from "../../utils/axios";
import { Helmet } from "react-helmet-async"; // Import Helmet for SEO
import { Spin } from "antd"; // Import Ant Design's Spin component for loading indicator

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const eventsPerPage = 6; // Number of events per page

  // Fetch paginated events from the backend
  useEffect(() => {
    const fetchPaginatedEvents = async () => {
      setLoading(true); // Start loading before the request
      try {
        const response = await Axios(
          `/event?page=${currentPage}&limit=${eventsPerPage}`
        );
        const data = response.data;
        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching paginated events:", error);
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    fetchPaginatedEvents();
  }, [currentPage]);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <title>{`Events - Page ${currentPage} | NAAMIST`}</title>
        <meta
          name="description"
          content={`Browse upcoming and past events at NAAMIST. Page ${currentPage} of events including alumni gatherings, reunions, and professional development sessions.`}
        />
        <meta
          name="keywords"
          content={`NAAMIST events, alumni events, NAME alumni, MIST events, page ${currentPage}`}
        />
        <meta
          property="og:title"
          content={`Events - Page ${currentPage} | NAAMIST`}
        />
        <meta
          property="og:description"
          content={`Check out the latest events hosted by the NAME Alumni Association of MIST. View alumni gatherings, professional events, and reunions. Currently viewing page ${currentPage}.`}
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <meta property="og:url" content={`https://naamist.mist.ac.bd/events`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Events - Page ${currentPage} | NAAMIST`}
        />
        <meta
          name="twitter:description"
          content={`Explore the latest events by NAAMIST, including reunions and alumni gatherings. Viewing events on page ${currentPage}.`}
        />
        <meta
          name="twitter:image"
          content="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link rel="canonical" href={`/events`} />
      </Helmet>

      <HeroSection
        imageUrl={
          "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        title={"Events"}
      />

      {/* Show loading spinner if events are being fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" /> {/* Ant Design's Spin component */}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 max-w-screen-xl mx-4 my-8 md:mx-auto">
            {events.map((event, index) => (
              <EventCard
                _id={event._id}
                key={index}
                cardImage={event.cardImage}
                title={event.title}
                description={event.description}
                eventDate={event.eventDate}
                eventContent={event.eventContent}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-800 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 text-white bg-blue-600 rounded hover:bg-blue-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Events;
