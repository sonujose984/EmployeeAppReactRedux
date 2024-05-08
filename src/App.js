
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './Components/EmpListing';
import EmpCreate from './Components/EmpCreate';
import Empupdate from './Components/Empupdate';
import EmpDetail from './Components/EmpDetail';
import { Container } from 'react-bootstrap';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="my-div">
      <Provider store={store}>
      <Container className="container-center">

<BrowserRouter>
   <Routes>
     <Route path='/' element={<EmpListing />}></Route>
      <Route path='/employee/create' element={<EmpCreate />}></Route>
      <Route path='/Empupdate' element={<Empupdate />}></Route> 
      <Route path='/EmpDetail/:empid' element={<EmpDetail />}></Route> 
   </Routes>
 </BrowserRouter>
 </Container>
      </Provider>
      
    </div>
  );
}

export default App;
