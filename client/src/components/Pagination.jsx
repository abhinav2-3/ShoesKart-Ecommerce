import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ page, setPage, products }) => {
  return (
    <div className="page-btn">
      <button
        className={`${page === 1 ? "disable-button" : "LR-btn"}`}
        onClick={() => setPage(page - 1)}
      >
        <FaAngleLeft size={28} />
      </button>
      <button
        className={page > products.length / 9 ? "disable-button" : "LR-btn"}
        onClick={() => setPage(page + 1)}
      >
        <FaAngleRight size={28} />
      </button>
    </div>
  );
};

export default Pagination;
