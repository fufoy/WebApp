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
        
     
          <Main styles={styles.main}/>
         
          
        </div>  
      );
    
  }
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
        <main  style={{ width: '80%', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{
  marginBottom: '40px'
}}>Créer un compte</h1>
  
        <form onSubmit={handleSubmit} style={{
    width: '100%'  
  }}>
  
          
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  }}>
  
          <label style={{display: 'block', marginBottom: "20px"}}>
            Email: 
           
          </label>
          <input
              type="email" 
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div style={{
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  }}>
          <label style={{display: 'block'}}>
            Mot de passe:
            
          </label>
          <input  
              type="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <style jsx>{`
        .btn-text {
          padding: 5px 10px;  
          background-color: green;
          color: white;
          border: none;
          border-radius: 4px; 
          cursor: pointer;
          display: inline-block; 
          
        }

        .btn-text:hover {
          opacity: 0.8;
        }
      `}</style>

      <p  onClick={register}>Register</p>
         
          
  
        </form>
      </div>
      </main>
    );
  }


export default Home4;