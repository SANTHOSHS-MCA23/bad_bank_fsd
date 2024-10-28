import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "axios";
import "./styles/Deposit.css";
import Navbar from "./navbar";

export default function Deposit() {
  const [values, setValues] = useState();
  const [data, setData] = useState();
  const [bin, setBin] = useState();

  const user = JSON.parse(localStorage.getItem("bankUser"));
  let token = user?.token;
  const navigate = useNavigate();

  useEffect(() => {
    let fetch = async () => {
      if (!token) {
        return null;
      } else {
        let res = await axios({
          method: "get",
          url: "http://localhost:3000/api/user/getbytoken",
          headers: {
            accepts: "application/json",
            token: token,
          },
        });
        setData(res.data);
      }
    };
    fetch();
  }, [token]);

  async function deposit(e) {
    e.preventDefault();
    if (!values ) {
      alert("please enter the amount")
    }else if(!bin){
      alert("please enter the Pin")

    }else if(values  > 0){
      if(data?.bin==bin){
        try {
          const url = `http://localhost:3000/api/user/deposit/${data?._id}`;
          let res=await axios.put(url,{depAmount:values})
          alert("Deposit success")
          setValues("")
          setBin("")
        } catch (error) {
          alert(error.message)
        }
      }else{
        alert("Pin is wrong")
      }
    }else if(values <= 0){
      alert("enter valid amount")
    }

      
  }
  return (
    <>
      <Navbar />
      <main className="bg">
        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Deposit</h2>
            <div className="input-box">
              <input
                type="number"
                placeholder="Enter the amount"
                value={values}
                onChange={(e) => setValues(e.target.value)}
              /><br />
              <label>Enter The Pin<br />
                <input
                  type="number"
                  placeholder="Enter the pin"
                  value={bin}
                  onChange={(e) => setBin(e.target.value)}
                />
              </label>
            </div>
            <br />
            <button className="input">
              <input type="submit" value="Deposit" onClick={deposit} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
