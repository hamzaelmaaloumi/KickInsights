import React from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

const Pagination = ({
  totalPosts,
  postPerPages,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPages); i++) {
    pages.push(i);
  }
  return (
    <>
      <nav
        className="z-0 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {(currentPage - 1) * postPerPages + 1} -
            {Math.min(currentPage * postPerPages, totalPosts)}
          </span>
          &nbsp;of
          <span className="font-semibold text-gray-900 dark:text-white">
            &nbsp;{totalPosts}
          </span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftRoundedIcon />
            </button>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(page)}
                className="flex items-center justify-center h-full text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                if (currentPage < pages.length) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <ChevronRightRoundedIcon />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
