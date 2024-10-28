import { useState ,useEffect} from "react";
import axios from "axios";
import "./styles/withdraw.css";
import Navbar from "./navbar";
export default function Withdraw() {
  const [data, setData] = useState();
  const [values, setValues] = useState();
  const [bin, setBin] = useState();

  const user = JSON.parse(localStorage.getItem("bankUser"));
  let token = user?.token;
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

  async function withdraw(e) {
    e.preventDefault();
    if (!values) {
      alert("please enter the amount")
    }else if(values  > 0){
      if(values<=data?.balance){
        if(data?.bin==bin){
          try {
            const url = `http://localhost:3000/api/user/withdraw/${data?._id}`;
            axios.put(url,{withdrawAmount:values})
            alert("Withdraw success")
            setValues("")
          } catch (error) { 
            alert(error.message)
          }
        }else{
          alert("Pin wrong")
        }
      }else{
        alert("Insufficent balance in your account")
      }
    }else if(values <= 0){
      alert("enter valid amount")
    }
  }
  return (
    <>
      <Navbar />
      <main className="with">
        <div className="form-withdraw">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Withdraw</h2>
            <div className="input-box">
              <input
                type="number"
                value={values}
                placeholder="Enter the amount"
                onChange={(e) => setValues(e.target.value)}
              />
              <br />
              <label>Enter The Pin<br />
                <input
                  type="number"
                  placeholder="Enter the Pin"
                  value={bin}
                  onChange={(e) => setBin(e.target.value)}
                />
              </label>
            </div>
            <br />

            <button onClick={withdraw}>Withdraw</button>
          </form>
        </div>
      </main>
    </>
  );
}
