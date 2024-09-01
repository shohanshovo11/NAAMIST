import HeroSection from "../Common/HeroSection";
import EventCard from "./EventCard";

const events = [
  {
    imageUrl:
      "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
    title: "Tech Conference 2024",
    description:
      "Join us for the annual Tech Conference where industry leaders discuss the latest trends in technology. Don't miss out on insightful talks and networking opportunities.",
    eventDate: "2024-10-05T09:00:00Z",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
    title: "Art Exhibition Opening",
    description:
      "Explore the new art exhibition featuring contemporary artists from around the world. The opening night includes a reception with the artists and live music.",
    eventDate: "2024-09-20T18:00:00Z",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
    title: "Fitness Workshop",
    description:
      "Participate in a hands-on fitness workshop with professional trainers. Learn new exercises, get tips on nutrition, and meet fellow fitness enthusiasts.",
    eventDate: "2024-11-15T11:00:00Z",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
    title: "Cooking Class: Italian Cuisine",
    description:
      "Join our cooking class to learn how to prepare delicious Italian dishes. This class is perfect for both beginners and experienced cooks.",
    eventDate: "2024-12-01T14:00:00Z",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/145683/pexels-photo-145683.jpeg",
    title: "Music Festival",
    description:
      "Experience a weekend of live music at our annual music festival. Featuring performances from top bands and artists across various genres.",
    eventDate: "2024-10-25T16:00:00Z",
  },
];

function Events() {
  return (
    <>
      <HeroSection
        imageUrl={
          "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        title={"Events"}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 max-w-screen-xl mx-auto my-20">
        {events.map((event, index) => (
          <EventCard
            key={index}
            imageUrl={event.imageUrl}
            title={event.title}
            description={event.description}
            eventDate={event.eventDate}
          />
        ))}
      </div>
    </>
  );
}

export default Events;
