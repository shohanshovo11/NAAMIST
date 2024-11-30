import { useState, useEffect } from "react";
import HeroSection from "../Common/HeroSection";
import EventCard from "./EventCard";
import Axios from "../../utils/axios";
import { Helmet } from "react-helmet-async"; // Import Helmet for SEO
import { Spin, Pagination } from "antd"; // Import Pagination from antd

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const eventsPerPage = 6; // Number of events per page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

      <div className="min-h-[800px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
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

            <div className="flex justify-center items-center py-8 bg-white">
              <Pagination
                current={currentPage}
                total={totalPages * eventsPerPage}
                pageSize={eventsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Events;
