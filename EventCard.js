import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <Link to={`/events/${event.id}`}>Voir les détails</Link>
    </div>
  );
}

export default EventCard;