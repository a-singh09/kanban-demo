import React from "react";
import "./css/TicketCard.css";
import { StatusIcon } from "../icons/StatusIcon";
import { TaskIcon } from "../icons/TaskIcon";

const TicketCard = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <span className="ticket-id">{ticket.id}</span>
      <h4>
        <TaskIcon task={ticket.status} /> {ticket.title}
      </h4>
      <div className="priority-icon">
        <StatusIcon status={ticket.priority} /> {ticket.tag.join(", ")}
      </div>

      <p>
        <span className="user-id">{user.name}</span>
      </p>
    </div>
  );
};

export default TicketCard;
