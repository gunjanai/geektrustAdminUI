import React from "react";
import "../css/Pagination.css";

function Pagination({ paginate, totalRows, rowsPerPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber, idx) => (
        <li key={idx} className="page-item">
          <button
            className="pagination-button"
            id="button"
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </div>
  );
}

export default Pagination;
