import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    
                    <Heading label={"Sign Up"}/>
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <div className="border-t-2 border-gray-300 my-4"></div>
                    <InputBox 
                        onChange={function(event){
                            setFirstName(event.target.value)
                        }} 
                        label={"First Name"} 
                        placeholder={"First Name"}
                    />
                    <InputBox 
                        onChange={function(event){
                            setLastName(event.target.value)
                        }}
                        label={"Last Name"} 
                        placeholder={"Last Name"}
                    />
                    <InputBox
                        onChange={function(event){
                            setEmail(event.target.value)
                        }} 
                        label={"Email"} 
                        placeholder={"example@gmail.com"}
                    />
                    <InputBox 
                        onChange={function(event){
                            setPassword(event.target.value)
                        }}
                        label={"Password"} 
                        placeholder={"Password"}
                    />
                    <div className="border-t-2 border-gray-300 my-7"></div>
                    <div className="pt-4">
                        <Button onClick={async function(){
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username: email,
                                password: password,
                                firstName: firstName,
                                lastName: lastName
                            });
                            localStorage.setItem("token", response.data.token)
                            navigate("/signin")
                        }} label={"Sign up"}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
                
            </div>
            
        </div>
        
    )
}