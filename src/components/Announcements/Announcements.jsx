import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Spin, Typography, Button } from "antd";
import { Helmet } from "react-helmet-async";
import Axios from "../../utils/axios";
import defaultAnnouncement from "/images/announcement.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const { Title } = Typography;

const imgUrl = import.meta.env.VITE_IMAGE_URL;

export default function Announcements() {
  const user = useAuthUser();
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
    <>
      <Helmet>
        <title>Announcements | NAAMIST</title>
        <meta
          name="description"
          content="Stay updated with the latest announcements from NAME Alumni Association of MIST. Find important updates, news, and notifications for alumni members."
        />
        <meta
          name="keywords"
          content="NAAMIST announcements, NAME alumni news, MIST updates, alumni notifications, NAME department announcements, MIST alumni news"
        />
        {/* Open Graph tags for social media */}
        <meta
          property="og:title"
          content="Announcements | NAME Alumni Association of MIST"
        />
        <meta
          property="og:description"
          content="Stay informed with the latest announcements and updates from the NAME Alumni Association of MIST. Access important news and notifications for alumni members."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://naamist.mist.ac.bd/announcements" />
        <meta property="og:image" content={defaultAnnouncement} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Announcements | NAME Alumni Association of MIST"
        />
        <meta
          name="twitter:description"
          content="Latest announcements and updates from NAAMIST. Stay connected with your alumni community."
        />
        <meta name="twitter:image" content={defaultAnnouncement} />

        {/* Canonical URL */}
        <link rel="canonical" href="https://naamist.mist.ac.bd/announcements" />
      </Helmet>

      <div className="container max-w-[1080px] mx-auto px-4 py-6">
        {/* Header with Title and Post Announcement Button */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <Title level={2} className="text-primary font-light">
            Announcements
          </Title>
          {/* Post Announcement Button */}
          {user?.role === "alumni" && (
            <Link to="/post-announcement">
              <Button type="primary" className="bg-primary">
              Post Announcement
              </Button>
            </Link>
          )}
        </div>

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
    </>
  );
}
