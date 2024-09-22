import React from "react";
import TicketCard from "./TicketCard";
import "./css/KanbanBoard.css";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  // Function to get the display name of the user
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const getUserById = (userId) => {
    return (
      users.find((u) => u.id === userId) || { name: "Unknown", id: userId }
    );
  };

  // Define initial groups for 'status' if groupBy is 'status'
  const initialStatusGroups = {
    Todo: [],
    "In progress": [],
    Backlog: [],
    Done: [],
    Cancelled: [],
  };

  // Grouping logic for 'status', 'user', or 'priority'
  const groupedTickets = tickets.reduce(
    (groups, ticket) => {
      let groupKey = "";

      if (groupBy === "status") {
        groupKey = ticket.status; // Group by status
      } else if (groupBy === "user") {
        groupKey = getUserName(ticket.userId); // Group by user
      } else if (groupBy === "priority") {
        groupKey =
          ticket.priority !== undefined
            ? `Priority ${ticket.priority}`
            : "No priority"; // Group by priority
      }

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(ticket);
      return groups;
    },
    groupBy === "status" ? { ...initialStatusGroups } : {},
  ); // Ensure all status fields are included only when groupBy is 'status'

  // Sorting tickets within each group
  const sortedTickets = Object.keys(groupedTickets).map((groupKey) => {
    const sortedGroup = [...groupedTickets[groupKey]].sort((a, b) => {
      if (sortBy === "priority") {
        // Convert priorities to numbers for correct numeric sorting
        return Number(b.priority) - Number(a.priority); // Sort by priority (Descending order)
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title); // Sort by title (Alphabetical)
      }
      return 0;
    });
    return { groupKey, tickets: sortedGroup };
  });

  return (
    <div className="kanban-board">
      {sortedTickets.map((group) => (
        <div key={group.groupKey} className="kanban-column">
          <h3>
            {group.groupKey}{" "}
            <span className="text-grey">({group.tickets.length})</span>
          </h3>
          {group.tickets.length > 0 ? (
            group.tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={getUserById(ticket.userId)}
              />
            ))
          ) : (
            <p>No tickets in this category</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
