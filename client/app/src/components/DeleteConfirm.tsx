import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const DeleteConfirm = ({ alert, setAlert, deleteFunction, managerName }) => {
  return (
    <>
      <div
        id="delete-confirm"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => setAlert(!alert)}
            >
              <CloseRoundedIcon />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">
              <h1 className="mb-4 text-left text-white text-lg font-semibold dark:text-white-400">
                Delete the manager
              </h1>
              <h3 className="mb-4 mt-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this manager?
              </h3>
              <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    deleteFunction(managerName);
                    setAlert(!alert);
                  }}
                  className="text-white text-center w-1/2 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm items-center px-5 py-2.5"
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  onClick={() => setAlert(!alert)}
                  className="py-2.5 w-1/2 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
