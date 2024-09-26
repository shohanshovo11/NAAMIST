import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Spin, Typography } from "antd";
import Axios from "../../utils/axios";
import defaultAnnouncement from "/images/announcement.png";

const { Title } = Typography;

const imgUrl = import.meta.env.VITE_IMAGE_URL;
export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const announcementsPerPage = 10;

  useEffect(() => {
    const fetchAnnouncements = async (page) => {
      setLoading(true);
      try {
        const response = await Axios.get(
          `/announcements/paginated?page=${page}&limit=${announcementsPerPage}`
        );
        setAnnouncements(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
      setLoading(false);
    };

    fetchAnnouncements(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Title level={2} className="text-center text-primary font-light mb-6">
        Announcements
      </Title>

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4 container max-w-[1080px] mx-auto">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-3 md:p-4 relative"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3">
                {/* Image */}
                <img
                  src={
                    announcement.image
                      ? `${imgUrl}/announcements/${announcement.image}`
                      : defaultAnnouncement
                  }
                  alt={announcement.title}
                  className={`w-full md:w-28 h-28 rounded-md ${
                    announcement.image ? "object-cover" : "object-contain"
                  }`}
                />

                {/* Content */}
                <div className="flex-1 self-start relative">
                  {/* Title */}
                  <h4 className="text-lg md:text-xl font-bold text-gray-800">
                    {announcement.title}
                  </h4>

                  {/* Date - Positioned Top Right */}
                  <p className="md:absolute md:top-0 md:right-0 text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString()}
                  </p>

                  {/* Description (Truncated) */}
                  <p className="text-sm md:text-sm text-gray-600 mt-2">
                    {announcement.description
                      ? `${announcement.description.slice(0, 300)}...`
                      : "No description available."}
                  </p>
                </div>

                <div className="md:absolute bottom-4 right-4 self-end">
                  <Link to={`/announcement/${announcement._id}`}>
                    <button className="text-primary hover:underline mt-1 text-sm md:text-sm font-light">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalPages * announcementsPerPage}
          pageSize={announcementsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
