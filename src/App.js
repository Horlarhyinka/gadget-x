
import './App.css';
import React from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import AdminHome from "./container/admin-home";
import Header from './components/header';
import Home from './container/home';
import Shop from './container/shop';
import Preview from './container/preview';
import Cart from './container/cart';
import History from './container/history';
import AdminPreview from './container/admin-preview';
import Authenticate from './container/auth';
import AdminAuthenticate from './container/admin-auth';
import NewAdmin from './container/new-admin';
import ForgetPassword from './container/forget-password';
import ResetPassword from './container/reset-password';
import SideNav from './components/side-nav';
import Footer from './components/footer';
import NotFound from './container/not-found';
import Comments from './container/comments';
import PaymentCallback from './container/callback'

class App extends React.Component{
state={
  navOpen:false
}

toggleNav = () =>!this.state.navOpen?this.setState({navOpen:true}):this.setState({navOpen:false})
render(){
   return (
  <BrowserRouter>
  {/* <div className="App"> */}
   <Header toggleNav={this.toggleNav} />
   {this.state.navOpen && <SideNav toggleNav={this.toggleNav} />}
     <Routes >
      <Route exact path= "/admin" element={<AdminHome />} />
       <Route exact path='/admin/auth' element={<AdminAuthenticate />}/>
       <Route exact path='/admin/products/:id' element={<AdminPreview />} />
       <Route exact path='/admin/new' element={<NewAdmin />} />
       <Route exact path='/shop' element={<Shop/>} />
       <Route exact path='/cart' element={<Cart />} />
       <Route exact path='/products/:id/comments' element={<Comments />} />
       <Route exact path='/' element={<Home/>}/>
       <Route exact path='/products/:id' element={<Preview />} />
       <Route exact path='/history' element={<History />} />
       <Route exact path='/payment/callback' element={<PaymentCallback />} />
       <Route exact path='/auth' element={<Authenticate />} />
       <Route exact path='/forget-password/:token' element={<ResetPassword/>} />
       <Route exact path='/forget-password' element={<ForgetPassword />} />
       <Route path='/*' element={<NotFound />} />
     </Routes>
     <Footer />
       {/* </div> */}
     </BrowserRouter>
  );
}
 
}

export default App;
