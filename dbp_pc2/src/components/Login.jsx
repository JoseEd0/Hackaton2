import React,{useState} from "react";
import { useAuth } from "../AuthContext";
import { fetchLogin } from "./api";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login} = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response= await fetchLogin(email,password);
            login(response.token); 
        } catch (error){
            console.error("Login failed: ",error);
        }
    }; 
     
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;