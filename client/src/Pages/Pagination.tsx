import { useState } from "react";
import { MetaData } from "../types/pagination";

interface IProps {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const Pagination = ({ metaData, onPageChange }: IProps) => {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
        <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
          {pageSize} produkter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-gray-500 mt-4 lg:mt-0">
          {(currentPage-1) * pageSize + 1}-
                    {currentPage * pageSize > totalCount!
                        ? totalCount
                        : currentPage * pageSize
                    } av {totalCount} produkter
        </p>
      </div>

      <div aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
        <button
          className="p-2 mr-4 rounded hover:bg-gray-100"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`p-2 ml-4 rounded hover:bg-gray-100 ${page === currentPage ? 'bg-gray-200' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button className="p-2 ml-4 rounded hover:bg-gray-100" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
