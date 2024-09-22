import React, { useState } from "react";
import "./css/Header.css";
import { Display } from "../icons/icons";

const Header = ({ groupBy, sortBy, onGroupByChange, onSortByChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle the popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close popup when clicking outside
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="header-container">
      <button className="display-button" onClick={togglePopup}>
        <Display /> Display
      </button>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="group-options">
              <label htmlFor="groupBy">Group By: </label>
              <select
                id="groupBy"
                value={groupBy}
                onChange={(e) => {
                  onGroupByChange(e.target.value);
                  closePopup(); // Close popup after selection
                }}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="sort-options">
              <label htmlFor="sortBy">Sort By: </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => {
                  onSortByChange(e.target.value);
                  closePopup(); // Close popup after selection
                }}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          {/* Click anywhere outside the popup to close */}
          <div className="popup-overlay" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
};

export default Header;
