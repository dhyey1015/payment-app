import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Users(){

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    useEffect(function(){
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(function(response){
                setUsers(response.data.user)
            })
    }, [filter])
    return(
        <>
            <div className="font-bold mt-6 text-3xl pb-6 ">
                Users
            </div>
            <div className="my-2">
                <input 
                    onChange={function(event){
                        setFilter(event.target.value)
                    }}
                    className="w-full px-2 py-1 border rounded border-slate-200"
                    type="text"
                    placeholder="Search users..."
                />
            </div>
            <div className="py-6">
                {users.map(user => <User key={user._id} user={user}/>)}
            </div>
        </>
    )
}

function User({user}){

    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full w-12 h-12 bg-slate-200 flex justify-center mt-1 mr-2 ml-8">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full ml-3">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col justify-center ">
                <Button onClick={function(e){
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                }} label={"Send Money"}/>
            </div>
        </div>
    )
}