import React from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ contact }) => {
    
  return (
    <Link to={`/contacts/${contact.id}`} className="contact__item" >
            <div className="contact__header" >
                <div className="contact__image" >
                    <img src={contact.photoUrl} alt={contact.name}  />
                </div>
                <div className="contact__details">
                    <p className="contact_name"  >{contact.name.substring(0, 15)} </p>
                    <p className="contact_title" >{contact.title}</p>
                    <div className="contact__body" >
                    <p><i>📝</i> {contact.status.length > 11 
                               ? contact.status.substring(0, 11) + "..."
                               : contact.status } </p>
                <p><i>📧</i>  {contact.email.length > 10 
    ? contact.email.substring(0, 10) + "..."
    : contact.email
  }</p>
                
                <p>
  <i>📍</i> 
  {contact.address.length > 10 
    ? contact.address.substring(0, 10) + "..."
    : contact.address
  }
</p>
                <p><i>☎️</i> 
                {contact.phone.length > 11 
    ? contact.phone.substring(0, 11) + "..."
    : contact.phone
  }</p>
                
            </div>
                </div>
                
               
            </div>
            
            
            
        </Link>
  )
}

export default Contact