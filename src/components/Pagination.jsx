import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  citiesPerPage,
  handlePerPageChange,
}) => {
  return (
    <div className="pagination-container">
      <div className="dropdown-container">
        <label htmlFor="perPage">Records Per Page:</label>
        <select
          id="perPage"
          value={citiesPerPage}
          onChange={handlePerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
