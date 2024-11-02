import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  let user = localStorage.getItem("authUser");
  const username = JSON.parse(user);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    localStorage.clear();
    closer();
  };

  const closer = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <span>{username.name.split(" ")[0]}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" onClick={closer}>
            <span>
              Profile <CgProfile size={18} />
            </span>
          </Link>
          <Link to="/myOrders" onClick={closer}>
            My Orders
          </Link>
          <Link to="/admin" onClick={closer}>
            Add Shoes
          </Link>
          <Link to="/login" onClick={logoutHandler}>
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
