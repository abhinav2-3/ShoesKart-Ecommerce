import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const Rating = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (_, idx) => {
    let number = idx + 0.5;
    return (
      <span key={idx}>
        {stars >= idx + 1 ? (
          <FaStar />
        ) : stars >= number ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });
  return (
    <div className="ratingStar">
      {ratingStar}
      <p>({reviews} customer reviews)</p>
    </div>
  );
};

export default Rating;
