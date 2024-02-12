import React , {useEffect, useRef} from 'react';
import {useState} from 'react'; 
import logo from '../Images/LogoACVA.JPG'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; 
import DataTable from 'react-data-table-component';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header2 from '../components/Header';
import ContactList from '../components/ContactList';
import ContactDetail from '../components/ContactDetail';
import { getContacts, saveContact, udpatePhoto } from '../api/ContactService';





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
  return (
    <header style={props.styles}>
    
      <img 
        src={logo} 
        alt=""
        style={{width: '150px'}}
      />  
    

    </header>
  );
}
const logout = async () => {
  await signOut(auth); 
  window.location = '/home2';
};

function Main(props) {

    const [number, setNumber] = useState(getRandomNumber());
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
  
    function getRandomNumber() {
      return Math.floor(Math.random() * 10) + 1;
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      if(parseInt(guess) === number) {
        setMessage("Correct! Vous avez gagné!");
        setNumber(getRandomNumber()); // generate new number
        setGuess('');
      } else {
        setMessage(guess > number ? "Trop haut!" : "Trop bas!");
        setGuess('');
      }
    }



    const column = [
      {
        name: 'Name', 
        selector: row => row.name, 
        sortable :true, 
      
      }, 
      {
        name: 'Prenom ', 
        selector: row => row.prenom 
      
      }, 
      {
        name: 'Absent',
        cell: row => <input type="checkbox" />
      
      },
      {
        name: 'Present',
        cell: row => <input type="checkbox" />
      
      }, 
      
    ]; 





    return (
        <main style={props.styles}>
            <div 
        style={{
          display: 'flex',
          justifyContent: 'flex-end', 
          padding: '10px 20px',  
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',  
      cursor: 'pointer',
      
      transition: '0.3s'
        }}
      >
        
        <button onClick={logout}>Se déconnecter</button>
        
      </div>
      <div>

      
      </div>
      

      


    

      <Section
      title="Partageons le sport, partageons le plaisir !"  
      
    >
      <table>
        <thead>
          <tr> 
            <th>NonSite</th>
          </tr>
        </thead>

        {/* <tbody>
          {dataa.map((d, i) => (
            <tr key={i}>
              <td>{d.Nomsite}</td> 
            </tr>
          ))}
        </tbody> */}
      </table>
    </Section>







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

    <div  style={{ width: 'min(1000px, calc(100% - 2rem))', marginInline: 'auto', overflow: 'hidden' }}>
      <Header2 toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <Routes>
            <Route path='/' element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
            <Route path="/contacts/:id" element={<ContactDetail updateContact={updateContact} updateImage={updateImage} />} />
          </Routes>
    </div>
      

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
                <span className="details">Nom&Prénom</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Sport du Matériel</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Téléphone</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
  <span className="details">Détails</span>
  <input 
    type="text" 
    value={values.status}
    onChange={onChange}
    name='status'
    required
    style={{
      width: '100%',
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap'
    }}
  />
</div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
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