import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReservationDetails = () => {

  // Récupérer l'id de la réservation dans les params de l'URL
  const { reservationId } = useParams();

  const [reservation, setReservation] = useState({});

  const fetchReservation = async () => {
    // Appel API pour récupérer la réservation
    const response = await fetch(`/api/reservations/${reservationId}`);
    const data = await response.json();

    setReservation(data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <div>
      <Header user={reservation.user} date={reservation.date} />

      <div className="cards-container">
        <Card title="Date de début" content={reservation.startDate} />
        <Card title="Date de fin" content={reservation.endDate} />
        <Card title="Status" content={reservation.status} />
        {/* etc. pour chaque propriété */}
      </div>

      <button className="button">Annuler la réservation</button>
    </div>
  );
};

export default ReservationDetails;

// Composants Header et Card

const Header = ({ user, date }) => {
  return (
    <header>
      <h1>Réservation de {user}</h1>
      <p>Fait le :  {date}</p>
    </header>
  );
};

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

// Styles CSS


