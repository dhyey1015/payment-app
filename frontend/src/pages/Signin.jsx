import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";


export function Signin(){
    const navigate = useNavigate()
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <div className="border-t-2 border-gray-300 my-4"></div>
                    <InputBox label={"Email"} placeholder={"example@gmail.com"}/>
                    <InputBox label={"Password"} placeholder={"Password"} />
                    <div className="border-t-2 border-gray-300 my-8"></div>
                    <div>
                        <Button onClick={function(){
                            navigate("/dashboard")
                        }} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign in"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}