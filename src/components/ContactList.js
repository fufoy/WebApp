import React from 'react';
import Contact from "./Contact"

const ContactList = ({ data, currentPage, getAllContacts }) => {
    return (
        <main style={{ marginTop: '1.3rem', marginLeft: '0px', marginRight: '0px' }}>
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))', gap: '1rem' }}>
                {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div style={{ color: 'black', padding: '5px 10px', textDecoration: 'none', transition: 'background-color .3s', border: '1px solid #ddd', cursor: 'pointer' }}>
                <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllContacts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </main>
    )
}

export default ContactList