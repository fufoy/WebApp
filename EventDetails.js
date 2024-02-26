import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../api/ContactService';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({
    id: '',
    name: '',
   description:'',
});

  useEffect(() => {
    // Fetch event details from API or database
    fetch(`events/${id}.json`)
      .then(response => response.json())
      .then(data => setEvent(data));
  }, [id]);

  const handleParticipation = (participate) => {
    // Update participation status in API or database
    console.log(`Participation status updated: ${participate}`);
  };

  const handleComment = (comment) => {
    // Add comment to the event in API or database
    console.log(`Comment added: ${comment}`);
  };


  const fetchContact = async (id) => {
    try {
        const { data } = await getEvent(id);
        setEvent(data);
        console.log(data);
        //toastSuccess('Contact retrieved');
    } catch (error) {
        console.log(error);
       
    }
};



  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <div className="participation-buttons">
        <button onClick={() => handleParticipation(true)}>Je participe</button>
        <button onClick={() => handleParticipation(false)}>Je ne participe pas</button>
      </div>
      <div className="comments">
        <h2>Commentaires</h2>
        <ul>
        {event.comments && event.comments.map(comment => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
        <input type="text" placeholder="Ajouter un commentaire" onChange={(e) => handleComment(e.target.value)} />
      </div>
    </div>
  );
}

export default EventDetails;