import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/create.css";
import Navbar from "./navbar";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [ref, setRef] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    async function handle(e) {
    e.preventDefault();
    if(!values.email || !values.password){
      alert("All field are requried")
    }else{
      const url = "http://localhost:3000/api/user/login";
      axios
        .post(url, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.status === 400) {
            console.log("Something went wrong");
          } else {
            alert("login success");
            localStorage.setItem("bankUser",JSON.stringify(res.data))
            setRef(!ref)
            navigate("/");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          )
            setError(error.response.data);
        });
    }
   
    }
    
  return (
    <>
        <Navbar />
      <main className="form-signin create" id="main">
        {/* <img src={createPhoto} className="imgg"/> */}
        <div className=" form-container">
          <h1 className="head">Login to Your Account</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="control">
              <label>Email address</label>
              <input
                type="email"
                id="exampleInputEmail1"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="control">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) =>setValues({ ...values, password: e.target.value })                }
              />
              <br />
              {error && <div>{error}</div>}
            </div>
            <div className="control">
              <input type="submit" onClick={handle} value="Login" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
