import { useState, useEffect } from "react";
import HeroSection from "../Common/HeroSection";
import EventCard from "./EventCard";
import Axios from "../../utils/axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 6; // Number of events per page

  // Fetch paginated events from the backend
  useEffect(() => {
    const fetchPaginatedEvents = async () => {
      try {
        const response = await Axios(
          `/event?page=${currentPage}&limit=${eventsPerPage}`
        );
        const data = response.data;
        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching paginated events:", error);
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
      <HeroSection
        imageUrl={
          "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        title={"Events"}
      />
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
  );
}

export default Events;
