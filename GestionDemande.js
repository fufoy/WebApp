// import React, { useState, useEffect, useRef } from 'react';
// import db from '../firebase'; 
// export const GestionDemande = () => {

//      const [input, setInput] = useState('');
//   const [todos, setTodos] = useState([]); 
//   useEffect(() => { 
//     db.collection('UserData').onSnapshot(snapshot => {
//       setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
//     })
//   }, []);
//   return (
//     <div>GestionDemande

// {todos.map(todo => (
//         <p todo={todo} />
//       ))}
//     </div>
    
//   )
// }
