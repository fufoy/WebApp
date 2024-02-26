import React, { useState, useEffect } from 'react';
import Contact from "./Contact"; // Assuming Contact represents sporting equipment

const ContactList = ({ data, currentPage, getAllContacts }) => {
    const [filteredData, setFilteredData] = useState(data?.content || []);

    // Filter state variables
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [priceMinFilter, setPriceMinFilter] = useState('');
    const [priceMaxFilter, setPriceMaxFilter] = useState('');
    const [dateMinFilter, setDateMinFilter] = useState('');
    const [dateMaxFilter, setDateMaxFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState(''); // Added location filter
  
    useEffect(() => {
      const applyFilters = () => {
        const filteredContacts = data?.content?.filter((contact) => {
          return (
            (contact.name?.toLowerCase().includes(nameFilter.toLowerCase()) || !nameFilter) &&
            (!typeFilter || contact.type === typeFilter) &&
            (!brandFilter || contact.brand === brandFilter) &&
            (!priceMinFilter || contact.price >= priceMinFilter) &&
            (!priceMaxFilter || contact.price <= priceMaxFilter) &&
            (!dateMinFilter || new Date(contact.date) >= new Date(dateMinFilter)) && // Handle date filtering correctly
            (!dateMaxFilter || new Date(contact.date) <= new Date(dateMaxFilter)) && // Handle date filtering correctly
            (!locationFilter || contact.location.toLowerCase().includes(locationFilter.toLowerCase()) || !locationFilter) // Added location filter
          );
        });
        setFilteredData(filteredContacts);
      };
  
      applyFilters();
    }, [
      data,
      nameFilter,
      typeFilter,
      brandFilter,
      priceMinFilter,
      priceMaxFilter,
      dateMinFilter,
      dateMaxFilter,
      locationFilter,
    ]);
  
    const handleNameChange = (event) => {
      setNameFilter(event.target.value);
    };
  
    const handleTypeChange = (event) => {
      setTypeFilter(event.target.value);
    };
  
    const handleBrandChange = (event) => {
      setBrandFilter(event.target.value);
    };
  
    const handlePriceMinChange = (event) => {
      setPriceMinFilter(event.target.value);
    };
  
    const handlePriceMaxChange = (event) => {
      setPriceMaxFilter(event.target.value);
    };
  
    const handleDateMinChange = (event) => {
      setDateMinFilter(event.target.value);
    };
  
    const handleDateMaxChange = (event) => {
      setDateMaxFilter(event.target.value);
    };
  
    const handleLocationChange = (event) => {
      setLocationFilter(event.target.value);
    };
  

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px' ,  }}>
        <h3>Filters</h3>

        <div>
          <label>
           Nom Du Produit :
           <input 
  type="text"
  value={nameFilter}
  onChange={handleNameChange}
  placeholder="Recherche"
/>          </label>
        </div>

        <div>
          <label>
            Type:
            <select value={typeFilter} onChange={handleTypeChange}>
              <option value="">All</option>
              {/* Dynamically populate options based on available types */}
              {data?.types?.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Brand:
            <select value={brandFilter} onChange={handleBrandChange}>
              <option value="">All</option>
              {/* Dynamically populate options based on available brands */}
              {data?.brands?.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </label>
        </div>

       <label>
          Price:
          <input
            type="number"
            min="0" // Set minimum price
            value={priceMinFilter}
            onChange={handlePriceMinChange}
            placeholder="Min"
            style={{ marginRight: '5px' }}
          />
          <input
            type="number"
            min="0" // Set minimum price
            value={priceMaxFilter}
            onChange={handlePriceMaxChange}
            placeholder="Max"
          />
        </label>

        <div>
          <label>
            Date:
            <input
              type="date"
              value={dateMinFilter}
              onChange={handleDateMinChange}
              placeholder="From"
              style={{ marginRight: '5px' }}
            />
            <input
              type="date"
              value={dateMaxFilter}
              onChange={handleDateMaxChange}
              placeholder="To"
            />
          </label>
        </div>

        <div>
          <label>
            Quantity:
            <input
              type="number"
              min="0" // Set minimum quantity
            //   value={quantityFilter}
            //   onChange={handleQuantityChange} // Add handler for quantity filter
              placeholder="Filter by quantity"
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <input
              type="text"
            //   value={descriptionFilter}
            //   onChange={handleDescriptionChange} // Add handler for description filter
              placeholder="Search description"
            />
          </label>
        </div>

        <div>
          <label>
            Location:
            <input
              type="text"
              value={locationFilter}
              onChange={handleLocationChange}
              placeholder="Filter by location"
            />
          </label>
        </div>
      </aside>

      <main style={{ flex: 1, margin: '0 20px' }}>
        {filteredData?.length === 0 && (
          <div>No sporting equipment matching your filters. Please adjust or clear filters.</div>
        )}

        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))', gap: '1rem' }}>
          {filteredData?.length > 0 &&
            filteredData.map((contact) => (
              <Contact key={contact.id} contact={contact} />
            ))}
        </ul>

        {filteredData?.length > 0 && data?.totalPages > 1 && (
          <div style={{ color: 'black', padding: '5px 10px', textDecoration: 'none', transition: 'background-color .3s', border: '1px solid #ddd', cursor: 'pointer' }}>
<a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

{ data &&
[...Array(data.totalPages).keys()].map((page, index) =>
<a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


<a onClick={() => getAllContacts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>          </div>
        )}
      </main>
    </div>
  );
};

export default ContactList;
