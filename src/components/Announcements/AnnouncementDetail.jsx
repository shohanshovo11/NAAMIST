import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import Axios from "../../utils/axios";

const imgUrl = import.meta.env.VITE_IMAGE_URL;

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch announcement details
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await Axios.get(`/announcements/${id}`);
        console.log(response.data.data, "ss");
        setAnnouncement(response.data.data);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div className="container min-h-[400px] px-4 py-6 max-w-[1080px] mx-auto">
      <h1 className="text-2xl font-bold mb-2">{announcement.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Date: {new Date(announcement.date).toLocaleDateString()}
      </p>

      {/* Description before the image */}
      <p className="text-base text-gray-700 mb-4">{announcement.description}</p>

      {/* Image last */}
      {announcement.image && (
        <img
          src={
            announcement.image
              ? `${imgUrl}/announcements/${announcement.image}`
              : "/default-image.png" // Fallback if no image is available
          }
          alt={announcement.title}
          className="w-full h-64 object-cover mb-4 rounded-md"
        />
      )}
    </div>
  );
};

export default AnnouncementDetail;
