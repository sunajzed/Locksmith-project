
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-900 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
       <img
  src="images/not-found.png"
  alt="404 Not Found"
  style={{ width: "400px", height: "400px", objectFit: "contain" }}
/>

        <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-2">
          The page you’re looking for doesn’t exist. It might have been removed or you may have mistyped the URL.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
        >
          <AiOutlineHome className="text-2xl" /> Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
}


