import { Link } from "react-router-dom";

const PleaseSignInFirst = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-24 w-24 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM4.937 14.031C5.47 12.583 7.053 12 9 12s3.53.583 4.063 2.031M12 18v-6m0 6a1 1 0 11-2 0m2 0a1 1 0 102 0m-2-6V6m0 0a1 1 0 011-1m-1 1a1 1 0 00-1-1m1 1a1 1 0 01-1 1"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Please Sign In
        </h1>
        <p className="text-gray-600 mb-6">
          You need to be signed in to access this page. Please sign in to
          continue.
        </p>
        <Link
          to="/authentication"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default PleaseSignInFirst;
