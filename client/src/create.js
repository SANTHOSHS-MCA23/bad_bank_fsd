import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import React from "react";
import axios from "axios";
import './styles/create.css'
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

export default function Create(){
    const navigate=useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        bin:""
    });
    const [error, setError] = useState("");
  
    async function handle(e) {
        e.preventDefault();
        try {
            console.log(values)
            const url = "http://localhost:3000/api/user/register";
            axios.post(url,{
                name: values.name,
                email: values.email,
                password: values.password,
                bin: values.bin,
                balance:0        
            })
            alert("Registerd Successfully");
            navigate("/login")
            
        } catch (error) {
            setError(error.response.data)
        }
      

    }

    return (
        <>
        <Navbar />
        <main className="form-signin create" id="main">
        {/* <img src={createPhoto} className="imgg"/> */}
        <div className=" form-container">
            <h1 className="head">Create Account</h1>
            <form onSubmit={(e)=> e.preventDefault()}>

                <div className="control">
                    <label>Name</label>
                    <input type="text" id="name"
                        
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
                </div>
                <div className="control">
                    <label>Email address</label>
                    <input type="email" id="exampleInputEmail1" 
                        
                        onChange={(e) => setValues({ ...values, email: e.target.value })
                    }
                    />
                </div>
                <div className="control">
                    <label>Password</label>
                    <input type="password"
                        
                        onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                        }
                    /><br/>
                </div>
                <div className="control">
                    <label>Pin</label>
                    <input type="number"
                        onChange={(e) =>
                            setValues({ ...values, bin: e.target.value })
                        }
                    /><br/>
                </div>
                <div className="control">
                    <input 
                      type="submit" 
                      onClick={handle} value="Create Account"
                    />
                </div>
                {error && <p style={{textAlign:"center",color:"red"}}>{error}</p>}
            </form>
        </div>
    </main>
    </>
    );
  };
