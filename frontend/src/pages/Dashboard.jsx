import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { Heading } from "../components/Heading"
import { useState, useEffect } from "react"
import axios from "axios"
export function Dashboard(){
    const [balance, setBalance] = useState(0) 
    useEffect(function(){
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(async function(response){
            setBalance(response.data.balance.toFixed(2))
        })  
    }, [])

    return(
        <div>
            <Appbar/>
            <div className=" flex justify-center">
                <Heading label={"Send Money"}/> 
            </div>
            <div className="m-8">
                <div className="border-t-2 border-gray-300 my-8"></div>
                    <Balance value={balance}/>
                <div className="border-t-2 border-gray-300 my-8"></div>
                <Users/>
            </div>
        </div>
    )
}