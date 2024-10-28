import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Account.css";
import Navbar from "./navbar";

export default function AccountDetail() {
  const [data,setData] = useState();
  let Sno = 0;

  
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

  return (
    <>
      <Navbar />
      <div className="tab">
        <table class="table  acc-detail-table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{data?.name}</td>
              <td>{data?.email}</td>
              <td>{data?.balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
