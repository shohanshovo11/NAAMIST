import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">{`The page you're looking for doesn't exist.`}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
