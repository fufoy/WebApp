import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';


const Order = ({ updateContact, updateImage }) => {
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
      

      return (
        <>

            <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i>| Back to list |</Link>

            <div className='product'>
                <h1>{contact.name} ({contact.status})</h1>
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

                    
                   

                    

                </div>
                


                <div >
                    <h1>Description du Produit</h1>

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
    name='Comment'
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
                            <div className="form_footer" style={{marginBottom: '20px' }}>
                            <button type="submit" className="btn" onClick={handleClick}> Save </button>

                            </div>
                            
                            
                        </form>
                        <div> </div>

                        <div className="file-input">
              <div className="input-box">
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
<button type="submit" className="btn" onClick={handleClick}> Ajouter </button>

                            </div>
                        <div className="form_footer">
                        </div>
              
                    </div>
                </div>
                {/* END SECTION 1 */}


            </div>




            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default Order;