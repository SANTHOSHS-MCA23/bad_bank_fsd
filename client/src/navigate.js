import { useNavigate } from "react-router-dom";
export default function Navigate(){
    
    const navigate=useNavigate();
    async function deposit(){
        navigate('/deposit')
    }
    async function withdraw(){
        navigate('/withdraw')
    }
    return(
        <>
        <center>
         
        <button onClick={deposit}>Deposite Page</button>
        <button  onClick={withdraw}>Withdraw Page</button>
       
        </center>
        </>
    )
}