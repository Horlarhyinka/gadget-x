
import './App.css';
import React from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import AdminHome from "./container/admin-home";
import Header from './components/header';
import Modify from './container/modify';
import Home from './container/home';
import Shop from './container/shop';
import Preview from './container/preview';
import Cart from './container/cart';
import History from './container/history';
import AdminPreview from './container/admin-preview';


function App() {
  console.log(process.env.REACT_APP_TEST)
  return (
    // <h1>hello</h1>
    
  <BrowserRouter>
  {/* <div className="App"> */}
   <Header/>
     <Routes>
      <Route exact path= "/admin/login" element={<h1>admin login</h1>} />
      <Route exact path= "/admin" element={<AdminHome />} />
       <Route exact path='/admin/login' element=""/>
       <Route exact path='/admin/products/:id' element={<AdminPreview />} />
       <Route exact path='/shop' element={<Shop/>} />
       <Route exact path='/cart' element={<Cart />} />
       <Route exact path='/' element={<Home/>}/>
       <Route exact path='/products/:id' element={<Preview />} />
       <Route exact path='/history' element={<History />} />
     </Routes>
       {/* </div> */}
     </BrowserRouter>
  );
}

export default App;
