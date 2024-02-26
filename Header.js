import React from 'react';

const Header2 = ({ toggleModal, nbOfContacts }) => {
  return (
    <header style={{ marginBottom:20 , marginTop: 20 }} >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  , marginRight : 50 , marginLeft: 250}}>
        <h3>Liste de Publications ({nbOfContacts})</h3>
        
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => toggleModal(true)} className='btn' style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px' }}>
            <i className='bi bi-plus-square'></i> Ajouter un Pret
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header2;