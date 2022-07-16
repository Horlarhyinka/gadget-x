
import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Admin_home from './container/admin_home';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Header/>
  <Routes>
    <Route exact path='/administrator/home' element={<Admin_home/>}/>
    <Route exact path='/administrator/login' element=""/>
    <Route exact path='/' element=""/>
    <Route exact path='/products' element={<Admin_home/>} />
  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
