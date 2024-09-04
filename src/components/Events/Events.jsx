import { useState } from "react";
import HeroSection from "../Common/HeroSection";
import EventCard from "./EventCard";

const events = [
  {
    _id: "1",
    imageUrl: "/images/events/1/1.jpg",
    title: "Fund Raising Campaign for Flood Relief",
    description:
      "Join us in supporting the urgent fundraising campaign for flood relief in Bangladesh. Your generosity can make a difference in the lives of those affected by the floods.",
    eventDate: "2024-10-05T09:00:00Z",
    eventContent: `
    <div class="">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Urgent Fundraising Campaign for Flood Relief</h1>
      <p class="text-gray-700 mb-4">Assalamualaikum,</p>
      <p class="text-gray-700 mb-4">In light of the devastating flooding currently affecting Bangladesh, many of our fellow citizens are in urgent need of assistance. As part of our commitment to social responsibility, the NAME Alumni Association of MIST (NAAMIST) is launching a critical fundraising campaign to support the ongoing relief efforts.</p>
      <p class="text-gray-700 mb-4">The funds raised will be directed to the Army, Navy, Air Force, or As Sunnah Foundation, who are tirelessly working to provide aid to those affected by the floods.</p>
      <h2 class="text-2xl font-semibold text-blue-600 mb-4">Your Support is Crucial</h2>
      <p class="text-gray-700 mb-4"><strong>Your generosity and compassion are crucial during this time.</strong> By coming together as a community, we can bring hope and relief to those who have lost so much.</p>
      <h3 class="text-xl font-semibold text-green-600 mb-4">Donation Details:</h3>
      <ul class="list-disc list-inside mb-4 text-gray-700">
        <li class="mb-2"><strong>Bkash:</strong></li>
        <ul class="list-disc list-inside ml-8 text-gray-700">
          <li>01677048415 (Tamanna, NAME-3)</li>
          <li>01521209550 (Usham, NAME-5)</li>
        </ul>
        <li class="mb-2"><strong>Nagad:</strong></li>
        <ul class="list-disc list-inside ml-8 text-gray-700">
          <li>+880 15 2150 3603 (Akib, NAME-6)</li>
        </ul>
        <li class="mb-2"><strong>Bank Account:</strong></li>
        <ul class="list-disc list-inside ml-8 text-gray-700">
          <li>Prime Bank</li>
          <li>AC No: 2135218029349</li>
          <li>Name: Tamanna Tasnim</li>
          <li>Branch: Pragati Sarani, Dhaka</li>
          <li><strong>Reference:</strong> flood-donation</li>
        </ul>
      </ul>
      <p class="text-gray-700 mb-4">The fund collection will conclude on <strong>25th August 2024</strong>. All collected funds will be transferred on <strong>26th August 2024</strong> to support the flood relief efforts.</p>
      <p class="text-gray-700 mb-4">Let's unite and extend our helping hand to our brothers and sisters in Bangladesh during this critical time.</p>
      <div class="text-center mt-8 mx-auto flex justify-center">
        <img src="/images/events/1/1.jpg" alt="Flood Relief" class="w-2/3 auto rounded-lg" />
      </div>
    </div>
  `,
  },
  // {
  //   _id: "2",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Art Exhibition Opening",
  //   description:
  //     "Explore the new art exhibition featuring contemporary artists from around the world. The opening night includes a reception with the artists and live music.",
  //   eventDate: "2024-09-20T18:00:00Z",
  // },
  // {
  //   _id: "3",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Fitness Workshop",
  //   description:
  //     "Participate in a hands-on fitness workshop with professional trainers. Learn new exercises, get tips on nutrition, and meet fellow fitness enthusiasts.",
  //   eventDate: "2024-11-15T11:00:00Z",
  // },
  // {
  //   _id: "4",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Cooking Class: Italian Cuisine",
  //   description:
  //     "Join our cooking class to learn how to prepare delicious Italian dishes. This class is perfect for both beginners and experienced cooks.",
  //   eventDate: "2024-12-01T14:00:00Z",
  // },
  // {
  //   _id: "5",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Music Festival",
  //   description:
  //     "Experience a weekend of live music at our annual music festival. Featuring performances from top bands and artists across various genres.",
  //   eventDate: "2024-10-25T16:00:00Z",
  // },
  // {
  //   _id: "6",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Tech Conference 2024",
  //   description:
  //     "Join us for the annual Tech Conference where industry leaders discuss the latest trends in technology. Don't miss out on insightful talks and networking opportunities.",
  //   eventDate: "2024-10-05T09:00:00Z",
  // },
  // {
  //   _id: "7",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Art Exhibition Opening",
  //   description:
  //     "Explore the new art exhibition featuring contemporary artists from around the world. The opening night includes a reception with the artists and live music.",
  //   eventDate: "2024-09-20T18:00:00Z",
  // },
  // {
  //   _id: "8",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Fitness Workshop",
  //   description:
  //     "Participate in a hands-on fitness workshop with professional trainers. Learn new exercises, get tips on nutrition, and meet fellow fitness enthusiasts.",
  //   eventDate: "2024-11-15T11:00:00Z",
  // },
  // {
  //   _id: "9",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Cooking Class: Italian Cuisine",
  //   description:
  //     "Join our cooking class to learn how to prepare delicious Italian dishes. This class is perfect for both beginners and experienced cooks.",
  //   eventDate: "2024-12-01T14:00:00Z",
  // },
  // {
  //   _id: "10",
  //   imageUrl:
  //     "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
  //   title: "Music Festival",
  //   description:
  //     "Experience a weekend of live music at our annual music festival. Featuring performances from top bands and artists across various genres.",
  //   eventDate: "2024-10-25T16:00:00Z",
  // },
];

function Events() {
  // Sort events by eventDate (most recent first)
  const sortedEvents = events.sort(
    (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6; // Updated to show 6 posts per page

  // Calculate total pages
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);

  // Get current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 max-w-screen-xl mx-auto my-20">
        {currentEvents.map((event, index) => (
          <EventCard
            _id={event._id}
            key={index}
            imageUrl={event.imageUrl}
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
