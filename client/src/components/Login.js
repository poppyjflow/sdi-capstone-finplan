import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles'

const Container = styled('form')({
    color: 'green',
    padding: 8
})

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authentication,setAuthentication] = useState(null);

    const navigate = useNavigate();

    function LoginHandle(e) {
        console.log("handle run")
        // const navigate = useNavigate();
        e.preventDefault();
        console.log(username);

        let body ={
            "username": username,
            "password": password
        }
        console.log(body)

        fetch('http://localhost:8080/login',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            //need to change result wait for database
            .then(result => {
                console.log(result[0].id)
                sessionStorage.setItem("loginStatus", "true")
                sessionStorage.setItem("userId", String(result[0].id))
                navigate('/');
            })
            .catch(() => alert("something is wrong "))
        console.log(body);
    }


    return (
        <div>
            <Container>

                <label htmlFor="username">username</label>
                <input type="text" id="username" 
                       placeholder="Your username here.." 
                       value={username} 
                       onChange={event => setUsername(event.target.value)} />


                <label htmlFor="password">password</label>
                <input type="current-password" id="password" 
                       placeholder="password here"
                       value={password}
                       onChange={event => setPassword(event.target.value)} />
                <input type="submit" value="Submit" onClick={LoginHandle} />
            </Container>
        </div>

    )
}
export default Login;