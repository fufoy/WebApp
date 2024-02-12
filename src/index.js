import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home'; 
import Home2 from './pages/signIn' ;
import Home3 from './pages/signUp'; 
import Home4 from './pages/signUpCopy';

import{
  createBrowserRouter, 
  RouterProvider, 
  Route,
  BrowserRouter, 
} from "react-router-dom" ; 

const router = createBrowserRouter(
  [{

    path: "/",
    element: <App/>,
  },

  {

    path: "/home",
    element: <Home/>,
  },
  {

    path: "/home2",
    element: <Home2/>,
  },
  {

    path: "/home3",
    element: <Home3/>,
  },
  {

    path: "/home4",
    element: <Home4/>,
  },
    
  ]
);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  
);
const root2 = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
 
 
  <Home2 />
</BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
