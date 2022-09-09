
import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import AdminHome from './container/admin_home';
import Header from './components/header';
import Modify from './container/modify';

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
  <Header/>
  <Routes>
    <Route exact path='/administrator/home' element={<AdminHome/>}/>
    <Route exact path='/administrator/login' element=""/>
    <Route exact path='/administrator/products/:id' element={<Modify />} />
    <Route exact path='/' element=""/>
    <Route exact path='/products' element={""} />
  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
