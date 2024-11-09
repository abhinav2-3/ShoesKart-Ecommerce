import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import PropType from "prop-types";
import { useFilterContext } from "../context/FilterContext";
const Pagination = ({ productsLength }) => {
  const { pagination, page } = useFilterContext();

  return (
    <div className="page-btn">
      <button
        className={`${page === 1 ? "disable-button" : "LR-btn"}`}
        onClick={() => pagination("prev")}
        disabled={page === 1}
      >
        <FaAngleLeft size={28} />
      </button>
      <button
        className={page > productsLength / 9 ? "disable-button" : "LR-btn"}
        onClick={() => pagination("next")}
        disabled={page > productsLength / 9}
      >
        <FaAngleRight size={28} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropType.number,
  setPage: PropType.func,
  productsLength: PropType.number,
};

export default Pagination;
