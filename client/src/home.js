import "./styles/App.css"
import "./styles/home.css"
import {Link} from 'react-router-dom'
import Navbar from "./navbar";

export  default function Home(){
  let user = localStorage.getItem("bankUser") || "null";

  return (
    <>
    <Navbar />
    <div className="home container-fluid">
        <div className="row section">
          <div className="col-sm-6 img-col">
          </div>
          <div className="col-sm-6">
            <h1 className="bank">Yes Bank of India</h1>
            <div>
              <h2 className="text">India's No 1 Bank</h2>
              {user==="null" && <h3 className="text">You Don't Have an Account  Please Create it .....!</h3>}
            </div>
            <div>
              <center>
              {user==="null" && <Link to="/Create">
                <button type="button" className="but">
                  Create Account
                </button>
              </Link>}
              {user!=="null" && <><Link to="/deposit">
                <button type="button" style={{marginRight:20}} className="but">
                  Deposit
                </button>
                </Link>
                <Link to="/withdraw">
                <button type="button" className="but">
                  Withdraw
                </button>
              </Link></>}
              </center>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};


