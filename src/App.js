
import './App.css';
import React from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import AdminHome from './container/admin_home';
import Header from './components/header';
import Modify from './container/modify';
import Home from './container/home';
import Shop from './container/shop';
import Preview from './container/preview';
import Cart from './container/cart';

function App() {
  return (
    // <h1>hello</h1>
    
     <BrowserRouter basename='/'>
    <div className="App">
   <Header/>
     <Routes>
       <Route exact path='/administrator/home' element={<AdminHome/>}/>
       <Route exact path='/administrator/login' element=""/>
       <Route exact path='/administrator/products/:id' element={<Modify />} />
       <Route exact path='/shop' element={<Shop/>} />
       <Route exact path='/cart' element={<Cart />} />
       <Route exact path='/home' element={<Home/>}/>
       <Route exact path='/products/:id' element={<Preview />} />
     </Routes>
       </div>
     </BrowserRouter>
  );
}

export default App;
