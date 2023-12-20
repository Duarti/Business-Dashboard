import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <div className="mt-5">
      {Array.from({ length: totalPages }, (_, index) => {
        if (
          index < 2 ||
          index > totalPages - 3 ||
          Math.abs(currentPage - (index + 1)) <= 2
        ) {
          return (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-2 ${
                currentPage === index + 1 ? "bg-gray-400 rounded-xl" : ""
              }`}
            >
              {index + 1}
            </button>
          );
        }

        if (index === 2 && currentPage > 4) {
          return (
            <span key="start-dots" className="px-2">
              ...
            </span>
          );
        }

        if (index === totalPages - 3 && currentPage < totalPages - 3) {
          return (
            <span key="end-dots" className="px-2">
              ...
            </span>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Pagination;
