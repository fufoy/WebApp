import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';
import Order from './Order';
import { Routes, Route, Navigate } from 'react-router-dom';
import { deleteContact } from '../api/ContactService';
import ReservationDetails from './reservation-details';


const ContactDetail = ({ updateContact, updateImage }) => {
    const inputRef = useRef();
    const [contact, setContact] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: '',
        details:'',
        comment:'',
    });

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setContact(data);
            console.log(data);
            //toastSuccess('Contact retrieved');
        } catch (error) {
            console.log(error);
           
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const udpatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            console.log('data');
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const onUpdateContact = async (event) => {
        event.preventDefault();
        await updateContact(contact);        
        fetchContact(id);
    };

    useEffect(() => {
        fetchContact(id);
    }, []);

    const handleClick = () => {
        window.location.href = "http://localhost:3000/contacts";
      };
      
      const [showModal, setShowModal] = useState(false);
      const handleClick2 = () => {
        setShowModal(true);
      }
      const Modal = ({ children }) => (
        <div className="modal">
          {children}
          <button onClick={() => setShowModal(false)}>Fermer</button> 
        </div>
      );
      const toggleModal = () => {
        setShowModal(!showModal);
      }

      



      const handleDelete = async () => {
        try {
          await deleteContact(contact.id);
          // afficher message de confirmation
          // rediriger vers liste des contacts
          window.location.href = "/contacts";
        } catch (err) {
          // afficher erreur 
        }
      }

      const [reservationId, setReservationId] = useState('')

      const [isBooked, setIsBooked] = useState(false);
      const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const BookingConfirmation = ({startDate, endDate, onCancel}) => (
  <div className="container">
          <h1 style={{ color: 'black' , marginTop:50 }}>Demande envoyée !</h1>
          <p style={{ color: 'black' , marginTop: 30}}>
            Du {startDate} au {endDate}
          </p>
          <div className="buttons">
            <button
             onClick={() => setIsBooked(false)}
              style={{ backgroundColor: '#f44336', color: 'white' , marginTop:60 ,borderRadius: 5, padding: 10 , fontWeight: 'bold'  }}
            >
              Annuler
            </button>
            <button  style={{ backgroundColor: 'green', color: 'white' ,  marginLeft:60 ,borderRadius: 5, padding: 10 , fontWeight: 'bold' }}

              onClick={() => window.location.href = `/reservations/${contact.id}`}
            >
              Mes réservations
            </button>
          </div>
        </div>
)



  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBook = () => {
    setIsBooked(true);
    setIsConfirmed(true);
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(true);

  const handleDeleteClick = () => {
    // Afficher la confirmation
    setShowDeleteConfirmation(true);

    // Disparaitre le bouton "Supprimer"
    setShowDeleteButton(false);
  };

  const handleDeleteConfirmed = () => {
    // Supprimer le contact
    handleDelete(contact.id);
    setShowDeleteConfirmation(false);
    
  };

  const handleCancelDelete = () => {
    // Réinitialiser l'état du bouton
    setShowDeleteButton(true);
    // Masquer la confirmation
    setShowDeleteConfirmation(false);
 

  };


  const [isSignalOpen, setIsSignalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [signalDetails, setSignalDetails] = useState(""); // New state for signal details
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const [starColor, setStarColor] = useState("gray");

  const reasons = [
    { id: 1, label: "Contenu inapproprié" },
    { id: 2, label: "Harcèlement" },
    { id: 3, label: "Spam" },
    { id: 4, label: "Autre" },
  ];
  const handleSignalClick = () => {
    setIsSignalOpen(true);
  };
  
  // Function to handle the "Confirmer le signalement" button click
  const handleSignalSubmit = () => {
    // Implement logic to send the signal report, including the selected reason
    // Example:
    console.log("Publication signalée pour la raison:", selectedReason);
  
    setIsSignalOpen(false);
  };

      return (
        <>

            <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i>| Back to list |</Link>

            <div className='product'>
            <div>
      <h1>{contact.name} ({contact.status})
      
      </h1>
      
      {showDeleteButton && (
       <button
       style={{ float: "right", backgroundColor: "red" }}
       className="btn"
       onClick={handleDeleteClick}
       
     >
       Supprimer
     </button>
      )}
      {showDeleteConfirmation && (
        <div className="confirmation-container" style={{ float: "right" , marginBottom: 10}}>
          <p>Êtes-vous sûr de vouloir supprimer cette publication ?</p>
          <button
          style={{  backgroundColor: "red" , marginLeft:10 , marginTop:10 }}
            className="btn btn-continue"
            onClick={handleDeleteConfirmed}
          >
            Continuer
          </button>
          <button
          style={{  backgroundColor: "green" , marginLeft:100 }}
            className="btn btn-cancel"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Revenir
          </button>
        </div>
      )}
      
    </div>
   
    
                {/* SECTION 1  */}

                <div className='section_1'>
                  

                    {/* Box produit image  */}

                    <div className='product__details'>

                        <img src={contact.photoUrl} alt={`Product picture of ${contact.name}`} />

                        <div className='product__metadata'>
                            {/* <p className='product__name'>{product.name}</p> */}
                            <p className='product__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                            <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                        </div>

                    </div>

                    {/* Box profil  */}
                    <div className="profil_notation">
                    <div className="picker">

                    <div>
      {isConfirmed ? (
        <BookingConfirmation
          startDate={startDate}
          endDate={endDate}
          onCancel={() => setIsConfirmed(false)}
        />
      ) : (
        <div className="picker">
         <h2>Faire une réservation</h2> 
        
        

          <div className="field">
            
            <label>Date de début:</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Date de fin:</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          
          <button className="button" onClick={handleBook}>
            Réserver
          </button>
          
        </div>
      )}
    </div>
  
                       </div>
            

                    </div>
 
                </div>
                


                <div >
                    <h1>Description du Produit</h1><div style={{ float: "right", marginBottom: 10 }}>
        <button className="btn btn-danger" onClick={handleSignalClick}>
          Signaler la publication
        </button>
        {isSignalOpen && (
          <div className="signal-dropdown">
            <p>Sélectionnez la raison du signalement :</p>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              {reasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {reason.label}
                </option>
              ))}
            </select>
            <p>Expliquez pourquoi vous signalez cette publication :</p>
            <textarea
              value={signalDetails}
              onChange={(e) => setSignalDetails(e.target.value)}
              style={{ width: "100%", height: "100px", boxSizing: "border-box" }}
            />
            <button className="btn btn-primary" onClick={handleSignalSubmit}>
              Confirmer le signalement
            </button>
          </div>
        )}
      </div>

                    <div className='product__settings'>
                        <form onSubmit={onUpdateContact} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={contact.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={contact.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={contact.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone</span>
                                    <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" value={contact.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={contact.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={contact.status} onChange={onChange} name="status" required />
                                </div>
                                <div className="file-input">
              <div className="input-box">
  <span >Détails</span>

  <textarea
  value={contact.details}
  onChange={onChange} 
    name='details'
    required
    style={{
      width: '750%', 
      height: '300px',
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap'
    }}
  />

</div>

                            </div>
                               
                            </div>
                            
                            
                            
                        </form>
                        <div> </div>

                        <div className="file-input">
              <div className="input-box">
            <span >Donner un Avis sur la Publication : </span>
             <div style={{ fontSize:50 }}>
      {stars.map((star) => (
  <span key={star} onClick={() => { setRating(star); setStarColor("yellow"); }}>
    {rating >= star ? "★" : "☆"}
  </span>
  
))}


</div>

<div style={{ marginTop: 40 }} >
  <span >Ajouter un Commentaire</span>

  <textarea
  value={contact.comment}
  onChange={onChange} 
    name='Comment'
    required
    style={{
      width: '150%',
      height: '100px',  
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap',
      marginBottom: '20px' , 
      marginTop: '20px' 
    }}
  />

</div>
<button type="submit" className="btn" onClick={handleClick}> Valider </button>

                            </div>
                        <div className="form_footer">
                        </div>
              
                    </div>
                </div>
                {/* END SECTION 1 */}


            </div>

            </div>


            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}






export default ContactDetail;