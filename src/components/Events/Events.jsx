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
  {
    _id: "2",
    imageUrl: "/images/events/2/am_2.jpg",
    title: "Alumni Meeting 2023",
    description:
      "Join the Department of Naval Architecture and Marine Engineering for our annual Alumni Meeting. Reconnect with fellow alumni and faculty while discussing the future of the maritime industry and its challenges.",
    eventDate: "2023-12-05T10:00:00Z",
    eventContent: `
      <div class="">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Alumni Meeting 2023</h1>
        <p class="text-gray-700 mb-4">The Department of Naval Architecture and Marine Engineering (NAME) plays a pivotal role in advancing maritime technology and creating innovative solutions for naval and marine industries.</p>
        <p class="text-gray-700 mb-4">The department focuses on the design, construction, maintenance, and operational aspects of marine vessels and structures. Activities range from conceptualizing new ship designs to implementing cutting-edge engineering solutions for marine environments.</p>
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">Photo Board</h2>
        <p class="text-gray-700 mb-4">Here are some pictures from the seminar discussing departmental progress in the presence of the Head of the Department and other faculty members.</p>
        
        <!-- Image Gallery Section -->
        <div class="grid grid-cols-2 gap-4 my-8">
          <div>
            <img src="/images/events/2/am_1.jpg" alt="Gallery Image 1" class="w-full h-auto rounded-lg" />
          </div>
          <div>
            <img src="/images/events/2/am_2.jpg" alt="Gallery Image 2" class="w-full h-auto rounded-lg" />
          </div>
          <div>
            <img src="/images/events/2/am_3.jpg" alt="Gallery Image 3" class="w-full h-auto rounded-lg" />
          </div>
          <div>
            <img src="/images/events/2/am_4.jpg" alt="Gallery Image 4" class="w-full h-auto rounded-lg" />
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-green-600 mb-4">Challenges and Opportunities</h3>
        <p class="text-gray-700 mb-4">The Department of NAME faces key challenges, including keeping pace with rapid technological advancements and addressing significant environmental concerns, such as reducing the carbon footprint of marine vessels and managing pollution.</p>
        <p class="text-gray-700 mb-4">However, these challenges present valuable opportunities. The growing emphasis on sustainability creates a fertile ground for research into eco-friendly technologies. Collaborations with industry stakeholders will enhance practical training and facilitate applied research. Global trends, such as smart shipping and automation, offer new avenues for innovation.</p>
      </div>
    `,
  },
  {
    _id: "3",
    imageUrl: "/images/events/3/1.jpg",
    title: "Industrial Advisory Panel, 4th Meeting",
    description:
      "The 4th meeting of the Industrial Advisory Panel will address curriculum development, research advancements, and the future needs of the maritime industry. Join us for insightful discussions and collaboration.",
    eventDate: "2024-01-20T10:00:00Z",
    eventContent: `
      <div class="">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Industrial Advisory Panel, 4th Meeting</h1>
        <p class="text-gray-700 mb-4">The Department of Naval Architecture and Marine Engineering (NAME) welcomes the 4th meeting of the Industrial Advisory Panel (IAP). This meeting brings together industry professionals and academic leaders to discuss the evolving needs of the maritime industry and how the department can continue to align its curriculum, research, and activities with industry demands.</p>
        <p class="text-gray-700 mb-4">The IAP plays a crucial role in ensuring that NAME graduates are equipped with the skills and knowledge required in today's fast-changing maritime landscape. Discussions will focus on innovative ship design, sustainable practices, and regulatory challenges.</p>
        
        <h3 class="text-xl font-semibold text-green-600 mb-4">Key Topics Discussed</h3>
        <p class="text-gray-700 mb-4">The meeting covered several important topics:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700">
          <li>Curriculum updates to include emerging technologies such as autonomous vessels and AI in maritime operations.</li>
          <li>Research collaborations on green shipping technologies and alternative fuels.</li>
          <li>Strengthening industry connections for student internships and job placements.</li>
          <li>Exploring the impact of new maritime regulations on shipbuilding and design practices.</li>
        </ul>
        <p class="text-gray-700 mb-4">The IAP emphasized the importance of fostering innovation, sustainability, and industry-academic collaboration to prepare future engineers for the evolving challenges of the maritime industry.</p>
  
        <!-- Single Image at the End -->
        <div class="text-center my-8">
          <img src="/images/events/3/1.jpg" alt="Industrial Advisory Panel Meeting" class="w-2/3 mx-auto rounded-lg" />
        </div>
      </div>
    `,
  },
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 max-w-screen-xl mx-4 my-8 md:mx-auto">
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
