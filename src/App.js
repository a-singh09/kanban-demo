import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetching the data from API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  // Handler to update grouping and sorting
  const handleGroupByChange = (value) => setGroupBy(value);
  const handleSortByChange = (value) => setSortBy(value);

  return (
    <div className="app-container">
      <Header
        groupBy={groupBy}
        sortBy={sortBy}
        onGroupByChange={handleGroupByChange}
        onSortByChange={handleSortByChange}
      />
      <KanbanBoard
        tickets={tickets}
        users={users}
        groupBy={groupBy}
        sortBy={sortBy}
      />
    </div>
  );
};

export default App;
