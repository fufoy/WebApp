import React from 'react';
import { useState } from 'react';
import logo from '../Images/logo.png'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 


class Home4 extends React.Component {

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
        marginTop: 300,
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

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          username,
          email,
          password  
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          window.location = '/login';  
        }
      });
    }

   const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, 
        email, 
        password); 
      console.log(user)
      window.location = '/home';
    }catch (error){
      console.log(error.message); 

    }
    
   };
   const [user, setUser] = useState(
    {
      Name:''
    }
   )

   


  
    return (  
        <main style={props.styles}>
      <div>
        <h1>Créer un compte</h1>
  
        <form onSubmit={handleSubmit}>
  
          
  
          <label style={{display: 'block', marginBottom: "20px"}}>
            Email: 
            <input
              type="email" 
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </label>
  
          <label style={{display: 'block'}}>
            Mot de passe:
            <input  
              type="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)} 
            />
          </label>
  
          <button onClick={register}>S'inscrire</button>
          
  
        </form>
      </div>
      </main>
    );
  }

function Footer(props) {
  
  return (
    <footer style={{...props.styles, 
        left: 0,
        bottom: 0,}} >
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






export default Home4;