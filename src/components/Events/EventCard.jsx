import { Card } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

// EventCard Component
const EventCard = ({
  _id,
  imageUrl,
  title,
  description,
  eventDate,
  eventContent,
}) => {
  const navigate = useNavigate();
  // Format the date object to a readable string
  const formattedDate = format(new Date(eventDate), "MMMM d, yyyy");
  const handleCardClick = () => {
    navigate(`/event/${_id}`, { state: { eventContent, imageUrl } });
  };
  return (
    <Card
      cover={
        <img
          alt={title}
          src={imageUrl}
          style={{ height: "200px", objectFit: "cover", objectPosition: "top" }}
        />
      }
      className="p-4 bg-white shadow-lg rounded-lg"
    >
      <div className="pb-2 border-b border-gray-200">
        <Meta
          title={title}
          description={
            <p className="text-gray-600">
              {description.length > 100
                ? description.substring(0, 100) + "..."
                : description}
            </p>
          }
        />
      </div>
      <div className="py-4">
        <div className="flex items-center text-gray-600">
          <CiCalendar size={22} />
          <span className="ml-2">{formattedDate}</span>
        </div>
      </div>
      <div
        className="flex items-center justify-between pt-4 border-t border-gray-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <span className="text-primary font-semibold ">Read More</span>
        <IoIosArrowForward className="text-primary text-xl" />
      </div>
    </Card>
  );
};

export default EventCard;
