import "./styles/App.css";
import "./styles/home.css"
import {BrowserRouter,Routes,Route, HashRouter, Router} from 'react-router-dom'

import Login from "./login";
import Home from "./home";
import Create from "./create";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import AccountDetail from "./account";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path="/login" element={<Login/>} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/account' element={<AccountDetail />} />
        </Routes>
      </HashRouter> 
    </div>
  );
}