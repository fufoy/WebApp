import React from 'react';
import {useState} from 'react'; 
import logo from '../Images/LogoACVA.JPG'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; 




class Home extends React.Component {

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
          <Footer styles={styles.footer}/>
          
        </div>  
      );
   
  }
}



function Header(props) {
  return (
    <header style={props.styles}>
    
      <img 
        src={logo} 
        alt=""
        style={{width: '250px'}}
      />  
   
    </header>
  );
}


function Main(props) {
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Appel API pour se connecter
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(res => res.json())
      .then(data => {
        // Rediriger vers dashboard
        if(data.success) window.location = '/home';
      });
    }

const login =async () =>{
  try {
    const user = await signInWithEmailAndPassword(auth, 
      email, 
      password); 
    console.log(user)
     window.location = '/home2';

  }catch (error){
    console.log(error.message); 
  }

};






  
    return (
        <main style={props.styles}>
      <div >
        <h1>Se connecter</h1>
  
        <form onSubmit={handleSubmit}>
  
          <label>
            Email:
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
          </label>
  
          <label>
            Mot de passe:  
            <input
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
  
          <button onClick={login}>Se connecter</button>
        
  
        </form>
      </div>
      </main>
    )
  }
  

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






export default Home;