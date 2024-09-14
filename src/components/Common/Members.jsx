import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Table, Avatar } from "antd";
import HeroSection from "./HeroSection";
import allMembers from "../../utils/data/members";
import executiveMembers from "../../utils/data/committeeMembers";

// Filters Component
const Filters = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  workSector,
  setWorkSector,
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
          <div className="flex-1 md:flex-none">
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

          <div className="flex-1 md:flex-none mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
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
      <img
        src={user.imageUrl}
        alt={user.name}
        className="rounded-full h-40 w-40 object-cover mx-auto"
      />
      <h2 className="mt-4 text-xl font-semibold text-center">{user.name}</h2>
      <p className="text-center text-gray-500">Batch: {user.batch}</p>
      <p className="text-center text-gray-500">Sector: {user.workSector}</p>
      <div className="flex justify-center mt-4 space-x-4">
        <a href={user.facebook} target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 text-xl" />
        </a>
        <a href={user.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-blue-400 text-xl" />
        </a>
        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-700 text-xl" />
        </a>
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
      render: (text, record) => <Avatar src={record.imageUrl} size="large" />,
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

// Members Component with Conditional Rendering
const Members = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [workSector, setWorkSector] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let filteredUsers = [];

    if (filter === "executive") {
      // No need for pagination in executive panel
      setUsers(executiveMembers);
    } else {
      // Filter all members based on search query and work sector
      filteredUsers = allMembers.filter(
        (user) =>
          (workSector === "All" || user.workSector === workSector) &&
          (user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.batch?.includes(searchQuery) ||
            user?.workSector?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Pagination logic
      const usersPerPage = 6;
      const startIdx = (currentPage - 1) * usersPerPage;
      const paginatedUsers = filteredUsers.slice(
        startIdx,
        startIdx + usersPerPage
      );

      setUsers(paginatedUsers);
      setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));
    }
  }, [currentPage, filter, searchQuery, workSector]);

  return (
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
        />
        {filter === "executive" ? (
          <ExecutivePanel />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 rounded-md shadow-md ${
                  currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-2 rounded-md shadow-md ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-primary text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Members;
