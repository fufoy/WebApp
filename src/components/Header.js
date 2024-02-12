import React from 'react';

const Header2 = ({ toggleModal, nbOfContacts }) => {
  return (
    <header className='header'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Liste de Publications ({nbOfContacts})</h3>
        <div className="search-box" style={{
      display: "flex",
      alignItems: "center",
      width: "300px", // Ajustez la largeur selon vos besoins
      margin: "10px auto",
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    }}>
      <input
        type="search"
        placeholder="Rechercher..."
        
      />
      <button type="submit">Rechercher</button>
    </div>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => toggleModal(true)} className='btn' style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px' }}>
            <i className='bi bi-plus-square'></i> Préter un article
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header2;