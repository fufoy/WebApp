import React from 'react';
import car from './Images/car.jpeg'; 
import car2 from './Images/car2.jpeg';
import headeer from './Images/LogoACVA.JPG'; 
import logo from './Images/LogoACVA.JPG'





class App extends React.Component {

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
      footer: {
        backgroundColor: 'black',  
        color: 'white',
        textAlign: 'center', 
        padding: '10px',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
      }, 
      nav: {
        
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
        <MenuBar styles={styles.nav} />
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
        style={{width: '150px'}}
      />  
    </header>
  );
}
function MenuBar(props) {
  return (
   
    <nav style={props.styles} >
      
        <ul>
        <button style={{
        padding: '10px 20px',
        color: 'white',
        background: 'white',
        borderRadius: '25px', 
        cursor: 'pointer',
        
        ':hover': {
          opacity: 0.8
        }
      }}><a href="http://localhost:3000/home" style={{
        color: 'black',
        textDecoration: 'none', fontWeight: 'bold'
      }}>Espace de Travail </a></button> 
        </ul>
        <ul>
        <button style={{
        padding: '10px 20px',
        color: 'white',
        background: 'white',
        borderRadius: '25px', 
        cursor: 'pointer',
        
        
        ':hover': {
          opacity: 0.8
        }
      }}><a href="http://localhost:3000/home3" style={{
        color: 'black',
        textDecoration: 'none', fontWeight: 'bold'
      }}>Crée un Compte</a></button>
        </ul>
        <ul>
        
      </ul>
    </nav>
  );
}

function Main(props) {
 

  return (
    <main style={props.styles}>
      <div style={{ display: 'flex', alignItems: 'right' , marginTop: "50px" ,  marginLeft: '100px',}}>
      <h1  >Accueil</h1>
      </div>
      

            <div className="presentation" style={{ display: 'flex', alignItems: 'center', marginBottom: '100px' }}>
                
                
                <p style={{ textAlign: 'left' ,  marginLeft: '100px' , width: '500px', }}>
                <h2>A propos de L'association ACVA</h2>
                 L'association Polyjoule a été créée en 2005. Elle rassemble sous la même bannière deux établissements de formation : l'école d'ingénieurs Polytech Nantes et le Lycée de La Joliverie. L'objectif est de mettre en commun les connaissances de chacun afin d'avancer sur un même projet ; celui de la conception d'un véhicule fonctionnant à l'hydrogène. 
Et depuis 2006, POLYJOULE présente chaque année, au Shell Eco marathon, son véhicule face à une concurrence de haut niveau. Cette course est l'occasion de réunir des participants, venant de toute l'Europe, autour d'un même objectif ; celui de faire le plus de kilomètres tout en utilisant le moins d'énergie possible. L'année dernière, 187 équipes, dans plusieurs catégories, ont participé à la compétition qui se déroulait à Lausitz en Allemagne. 
</p>




<img src={headeer} alt="" style={{
    width: '700px',
    height: 'auto',
    marginLeft: '300px',

    borderRadius: '10px',
    boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
    
    transition: 'all 0.3s ease',

    ':hover': {
      transform: 'scale(1.1)',
      opacity: '0.8'
    }
  }} />

                
            </div>


            
    </main> 
  );
}




function Footer(props) {
  
  return (
    <footer style={props.styles} >
      <Section 
        title="Nom du site"
                 
      />
     <Section> subtitle="Adresse : Saint-nazaire "   </Section>
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
      <h3>{props.title}
      <div><h6>{props.subtitle}</h6></div>
    
     </h3>
      
      
    </div>
    
  )
}

export default App;
