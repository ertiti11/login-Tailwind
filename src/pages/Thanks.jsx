import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable no-unused-vars */

export default function Thanks() {
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    document.title = "Gracias por participar";
  }, []);

  useEffect(() => {
    if (accept) {
      navigate("/register");
    }
  }, [navigate, accept]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex flex-col items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600 w-28 h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold text-white">Thank You !</h1>
            <p className=" text-gray-400">
              Thank you for your interest! Check your email for a link to the
              guide.
            </p>
            <a className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <button
                onClick={() => setAccept(true)}
                className="text-sm font-medium"
              >
                OK!
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
