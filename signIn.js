import React , {useEffect, useRef} from 'react';
import {useState} from 'react'; 
import logo from '../Images/LogoACVA.JPG'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; 
import DataTable from 'react-data-table-component';
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Header2 from '../components/Header';
import ContactList from '../components/ContactList';
import ContactDetail from '../components/ContactDetail';
import { getContacts, saveContact, udpatePhoto } from '../api/ContactService';
import NavBar from "../components/layout/NavBar"
import Home3 from './signUp';
import Home from './home';
import Home4 from './signUpCopy';
import App from '../App'; 
import { useNavigate } from 'react-router-dom';
import ReservationDetails from '../components/reservation-details';
import { GestionDemande } from '../components/GestionDemande';
import EventCard from '../components/EventCard';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';





class Home2 extends React.Component { 

  render() {

    const styles = {
      header: {
        color: 'white',
        padding: '10px',
        height: '100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: 'url(/header-bg.jpg)',
        backgroundSize: 'cover',
        boxShadow: '0px 5px 15px rgba(0,0,0,0.1)'
      },
      main: {
        padding: '20px', 
        
      },
      footer: {
        backgroundColor: 'black',  
        color: 'white',
        textAlign: 'center', 
        padding: '10px',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 400,
  left: 0,
  bottom: 0,
      }, 
      nav: {
        backgroundColor: 'grey',  
        color: 'black',
        textAlign: 'center', 
        display: 'flex',
        flexDirection: 'row', 

        justifyContent: 'right', 
      },  
    }
    return (
        <div>
          
          <Header styles={styles.header}/> 
         
          <Main styles={styles.main}/>
          <Ali  />


          <Footer styles={styles.footer}/>
          
          
        </div>  
      );
    
  }
}

// partie 2 (de notre data)







function Header(props) {

 
  const handleClicks = () => {
    window.location.href = '/App'; 
  }
  return (
    <header style={props.styles}>
    
    <img 
        src={logo}
        alt="" 
        style={{width: '150px'}}
        onClick={handleClicks} 
      />

    

    </header>
  );
}
const logout = async () => {
  await signOut(auth); 
  window.location = '/';
};

function Main(props) {

    return (
        <main style={props.styles}>
     
      </main>
    );
  }
  function Ali(){
    const modalRef = useRef(); 
    const fileRef = useRef();
    const [data , setData] = useState({}); 
    const [currentPage , setCurrentPage] = useState(0); 
    const [file, setFile] = useState(undefined);
    
    const [values, setValues] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: '',
      details:'',
      comment:'',
    
    });
    const getAllContacts = async (page = 0, size = 10) => {
      try {
        setCurrentPage(page);
        const { data } = await getContacts(page, size);
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        
      }
    };
    const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleNewContact = async (event) => {
      event.preventDefault();
       // Récupérez la date du jour
  const currentDate = new Date().toISOString().slice(0, 10);

  // Ajoutez la date à l'objet values
  const submitValues = {
    ...values,
    date_publication: currentDate,
  };
      try {
        const { data } = await saveContact(values);
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', data.id);
        const { data: photoUrl } = await udpatePhoto(formData);
        toggleModal(false);
        setFile(undefined);
        fileRef.current.value = null;
        setValues({
          name: '',
          email: '',
          phone: '',
          address: '',
          title: '',
          status: '',
          details:'',
          comment:'',
         
        })
        getAllContacts();
      } catch (error) {
        console.log(error);
        
      }
    };
  
    const updateContact = async (contact) => {
      try {
        const { data } = await saveContact(contact);
        console.log(data);
      } catch (error) {
        console.log(error);
        
      }
    };
  
    const updateImage = async (formData) => {
      try {
        const { data: photoUrl } = await udpatePhoto(formData);
      } catch (error) {
        console.log(error);
        
      }
    };
  



    const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();
    useEffect(() => {
    getAllContacts();
  }, []);
 
  

  
  return (
    <>
 
  <Router>
    <div style={{  marginBottom:10 ,  marginTop:0}}>
    <NavBar />
    </div>
 
  <div  style={{  maxWidth: '1500px', 
    margin: '0 auto', marginInline: 'auto', overflow: 'hidden' , marginBottom:200 }}>
  

 
     
  
      <Routes>
            <Route path='/' element={<Navigate to={'/App'} />} />
            <Route path="/contacts" element={ <> <Header2 toggleModal={toggleModal} nbOfContacts={data.totalElements} /> 
            <ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} /></> } />
           <Route path="/contacts/:id" element={ <> <Header2 toggleModal={toggleModal} nbOfContacts={data.totalElements} />
           <ContactDetail updateContact={updateContact} updateImage={updateImage} /></>} />
           <Route path="/home3" element={<Home3 />} />
           <Route path="/home" element={<Home />} />
           <Route path="/home4" element={<Home4 />} />
           <Route path="/App" element={<App />} />
           <Route path="/EventCard" element={<EventCard />} />
           <Route path="/EventList" element={<EventList />} />
           <Route path="/EventDetails" element={<EventDetails />} />

           <Route path="/GestionDemande" element={<GestionDemande />} />
           <Route 
        path="/reservations/:id"
        element={<ReservationDetails />} 
      />
          </Routes>
          </div>
          </Router>
   
      

   <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>Nouvelle Publication</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"> ❌</i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Nom Du Matériel</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email de contact</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Sport </span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Téléphone de contact</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address de récupération</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
              <div className="input-box">
  <span className="details">Etat </span>

 
 

</div>
  <select
    id="status"
    name="status"
    required
    value={values.status}
    onChange={onChange}
  >
    <option value="">-- Veuillez choisir --</option>
    <option value="Valable">A préter </option>
    <option value="Non Valable">A Vendre</option>
  </select>
  {values.status === "Non Valable" && ( // Afficher le champ de prix si "A Vendre" est sélectionné
    <div  className="details">
      <label htmlFor="prix">Prix (€):</label>
      <input
        type="number"
        id="prix"
        name="prix"
        value={values.prix}
        placeholder="Entrez le prix"
        required
        onChange={onChange}
      />
    </div>
  )}
</div>
              
              <div className="file-input">
              <div className="input-box">
  <span >Détails</span>

  <textarea
  value={values.details}
  onChange={onChange} 
    name='details'
    required
    style={{
      width: '360%', 
      height: '100px',
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap'
    }}
  />

</div>
                <span className="details">Photos de l'Article</span>
                <input type="file" multiple onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
  </>
    );
   
  };


function Footer(props) {
  
  return (
    <footer style={props.styles} >
      <Section 
        title="Nom du site"
        subtitle="Nos coordonnées"
      />
      
      <Section 
        title="Contacts"
        subtitle="Nos coordonnées" 
        
      />

      <Section 
       title="Informations pratiques"  
       subtitle="Nos coordonnées"
      />

      <Section 
       title="Info sur  l'association"
       
      />
      <p>&copy;</p>
      
    </footer>
  );
}
function Section(props) {
  const sectionStyle = {
    padding: 10,
   
   
    marginRight: 10 , 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <div className="section" style={sectionStyle}>
      <h3>{props.title}</h3>
      
    </div>
  )
}

export default Home2;