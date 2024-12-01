import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaVoicemail } from "react-icons/fa";
import { Table, Avatar, Spin, Pagination, Alert } from "antd"; // Imported Spin here
import HeroSection from "./HeroSection";
import executiveMembers from "../../utils/data/committeeMembers";
import Axios from "../../utils/axios";
import defaultProfile from "../../assets/default_profile.png";
import { Helmet } from "react-helmet-async";
import { PhotoView, PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { IoIosMail, IoMdInformationCircle } from "react-icons/io";

const imgUrl = import.meta.env.VITE_IMAGE_URL;

// Filters Component
const Filters = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  workSector,
  setWorkSector,
  bloodGroup,
  setBloodGroup
}) => {
  const sectors = [
    "All",
    "Government",
    "Private",
    "Higher Study",
    "Defence",
    "Academician",
    "Others",
  ];

  const bloodGroups = [
    "All",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];

  return (
    <div className={`flex flex-wrap justify-between items-center my-4`}>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 ease-in-out ${
            filter === "executive"
              ? "bg-primary text-white"
              : "bg-white text-primary border border-primary"
          }`}
          onClick={() => setFilter("executive")}
        >
          Committee
        </button>
        <button
          className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 ease-in-out ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-white text-primary border border-primary"
          }`}
          onClick={() => setFilter("all")}
        >
          All Members
        </button>
      </div>

      {filter !== "executive" && (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex-1 md:flex-none mb-2 md:mb-0">
            <select
              className="px-4 py-2 border rounded-md w-full md:w-auto"
              value={workSector}
              onChange={(e) => setWorkSector(e.target.value)}
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 md:flex-none mb-2 md:mb-0">
            <select
              className="px-4 py-2 border rounded-md w-full md:w-auto"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  Blood Group: {group}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search by Name, Batch..."
              className="px-4 py-2 border rounded-md w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// User Card Component
const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <PhotoProvider>
        <PhotoView
          src={user?.profilePic ? `${imgUrl}/${user?.profilePic}` : defaultProfile}
        >
          <img
            src={user?.profilePic ? `${imgUrl}/${user?.profilePic}` : defaultProfile}
            alt={user?.name}
            className="rounded-full h-40 w-40 object-cover mx-auto cursor-pointer"
          />
        </PhotoView>
      </PhotoProvider>
      <h2 className="mt-4 text-xl font-semibold text-center">{user?.name}</h2>
      {user?.bloodGroup && (
        <p className="text-center text-gray-500">
          Blood Group: {user?.bloodGroup}
        </p>
      )}
      <p className="text-center text-gray-500">NAME: {user?.batch}</p>
      {user?.mobile && <p className="text-center text-gray-500">Mobile: {user?.mobile}</p>}
      {(user?.designation || user?.workplace) && <p className="text-center text-gray-500">
        Sector: {user.designation && `${user?.designation},`} {user?.workplace}
      </p>}
      <div className="flex justify-center items-center mt-4 space-x-4">
        {user?.facebook ? (
          <a href={user.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-xl" />
          </a>
        ) : (
          <FaFacebook className="text-gray-400 text-xl cursor-not-allowed" />
        )}
        {user?.email ? (
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`} target="_blank" rel="noopener noreferrer">
            <IoIosMail className="text-blue-700 text-3xl" />
          </a>
        ) : (
          <IoIosMail className="text-gray-400 text-3xl cursor-not-allowed" />
        )}
        {user?.linkedin ? (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-xl" />
          </a>
        ) : (
          <FaLinkedin className="text-gray-400 text-xl cursor-not-allowed" />
        )}
      </div>
    </div>
  );
};

// Executive Panel Component with AntD Table and Responsive Scrolling
const ExecutivePanel = () => {
  const columns = [
    {
      title: "Profile",
      dataIndex: "imageUrl",
      key: "profile",
      render: (text, record) => (
        <PhotoView src={record.imageUrl}>
          <Avatar
            src={record.imageUrl}
            size="large"
            className="cursor-pointer hover:opacity-80 transition-opacity w-16 h-16"
          />
        </PhotoView>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Work Sector",
      dataIndex: "workSector",
      key: "workSector",
    },
    {
      title: "Position",
      dataIndex: "panelPosition",
      key: "panelPosition",
    },
    {
      title: "Social Media",
      key: "socialMedia",
      render: (text, record) => (
        <div className="flex space-x-4">
          {console.log(record)}
          <a href={record.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-xl" />
          </a>
          <a href={record.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-xl" />
          </a>
          <a href={record.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-xl" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        dataSource={executiveMembers}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="min-w-full"
      />
    </div>
  );
};

// Members Component with Conditional Rendering and Backend Fetch
const Members = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [workSector, setWorkSector] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("All");

  // Fetch users from backend API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await Axios("/alumni/get");
        const data = response.data;
        const sortedData = data.sort((a, b) => a.batch - b.batch);

        setUsers(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    if (filter === "all") {
      fetchUsers(); // Fetch users only if the filter is "all"
    } else {
      setUsers(executiveMembers); // For executive members, use static data
    }
  }, [filter]);

  // Separate useEffect for filtering/pagination
  useEffect(() => {
    if (filter === "executive") return;

    const filterUsers = () => {
      return users.filter((user) => {
        const matchesWorkSector = workSector === "All" || user.workSectorType === workSector;
        const matchesBloodGroup = bloodGroup === "All" || user.bloodGroup === bloodGroup;
        const searchTerms = searchQuery.toLowerCase();
        const matchesSearch = 
          (user?.name?.toLowerCase() || "").includes(searchTerms) ||
          String(user?.batch || "").includes(searchTerms) ||
          (user?.workSector?.toLowerCase() || "").includes(searchTerms);
        
        return matchesWorkSector && matchesBloodGroup && matchesSearch;
      });
    };

    const filtered = filterUsers();
    const usersPerPage = 6;
    const totalFilteredPages = Math.ceil(filtered.length / usersPerPage);

    if (currentPage > totalFilteredPages) {
      setCurrentPage(1);
    }

    const startIdx = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filtered.slice(startIdx, startIdx + usersPerPage);

    setFilteredUsers(paginatedUsers);
    setTotalPages(totalFilteredPages);

  }, [currentPage, filter, searchQuery, workSector, bloodGroup, users]);

  return (
    <>
      <Helmet>
        <title>Members - NAME Alumni Network</title>
        <meta
          name="description"
          content="Browse the exclusive network of NAAMIST members, including executive committee members and alumni of the Naval Architecture and Marine Engineering department at MIST."
        />
        <meta
          name="keywords"
          content="NAAMIST members, NAME alumni, Naval Architecture and Marine Engineering, MIST NAME alumni, Alumni Network, Committee Members, NAME Alumni Directory, Alumni of MIST"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Members - NAME Alumni Network" />
        <meta
          property="og:description"
          content="Explore the members of the NAME Alumni Association of MIST and connect with professionals across different sectors."
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <meta
          property="og:url"
          content="https://www.namealumnimist.com/members"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NAAMIST Members - NAME Alumni Network"
        />
        <meta
          name="twitter:description"
          content="Discover the members of the NAME Alumni Association of MIST and connect with professionals from around the globe."
        />
        <meta
          name="twitter:image"
          content="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://www.namealumnimist.com/members" />
      </Helmet>
      <div className="w-full">
        {filter === "executive" ? (
          <HeroSection
            title={"Panel Members"}
            imageUrl={
              "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        ) : (
          <HeroSection
            title={"All Members"}
            imageUrl={
              "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        )}
        <div className="max-w-screen-xl mx-auto p-4">
          <Filters
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            workSector={workSector}
            setWorkSector={setWorkSector}
            bloodGroup={bloodGroup}
            setBloodGroup={setBloodGroup}
          />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" /> {/* Display Ant Design spinner */}
            </div>
          ) : filter === "executive" ? (
            <ExecutivePanel />
          ) : (
            <>
              <div className="flex items-center justify-center">
                <Alert
                  message={
                    <span className="text-xs flex items-center text-gray-500">
                      <IoMdInformationCircle className="mr-1" />
                      Phone numbers are only visible to authorized alumni and admin users
                    </span>
                  }
                  type="info"
                  className="mb-4 opacity-75"
                  showIcon={false}
                />
              </div>
              {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-16">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Members Found</h3>
                  <p className="text-gray-500 text-center">We couldn't find any members matching your search criteria. Try adjusting your filters.</p>
                </div>
              )}
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={totalPages * 10}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
