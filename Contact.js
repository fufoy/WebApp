import React from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ contact }) => {
    
  return (
    <Link to={`/contacts/${contact.id}`} className="contact__item" >
            <div >
           

                <div className="contact__image" >
                    <img src={contact.photoUrl} alt={contact.name}  />
                </div>
                <div className="contact__details">
                    <p className="contact_name"  >{contact.name.substring(0, 15)} </p>
                    <p className="contact_title" >{contact.title}</p>
                    <p className="contact_title" >{contact.date_publication}</p>

                    <div className="contact__body" >
                
                   
                    <p className="contact__body" >{contact.details}</p>
                    
                    <p><i>📝</i> {contact.status.length > 11 
                               ? contact.status.substring(0, 11) + "..."
                               : contact.status } </p>
                 <p><i>📍</i> {contact.address.length > 10  ? contact.address.substring(0, 10) + "..." : contact.address}
</p> 
</div> 
<div style={{float: 'right'}}>

      <style jsx>{`
        .btn-text {
          padding: 5px 10px;  
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px; 
          cursor: pointer;
          display: inline-block; 
          
        }

        .btn-text:hover {
          opacity: 0.8;
        }
      `}</style>

      <p className="btn-text">Lire Plus</p>

    </div>
</div>
                
               
            </div>
            
        </Link>
  )
}

export default Contact