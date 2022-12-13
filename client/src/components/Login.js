import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles'

const Container = styled('form')({
    color: 'green',
    padding: 8
})

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authentication,SetAuthentication] = useState(null);


    const navigate = useNavigate();

    function LoginHandle(e) {
        console.log("handle run")
        // const navigate = useNavigate();
        e.preventDefault();

        console.log(email);

        let body ={
            "email": email,
            "password": password
        }

        fetch('/login',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            //need to change result wait for database
            .then(result => SetAuthentication(result))
        console.log(body);

    }
    useEffect(()=>{
        if (authentication === null){

        }
        else if (authentication) {
            document.cookie = "loginStatus=true"
            document.cookie = `loginUserEmail=${email}`
            navigate('/');
        }else{
            alert("password or username not correct")
         }
},[authentication])


    // console.log(document.cookie);





    return (
        <div>
            <Container>
                <label htmlFor="email">email</label>
                <input type="text" id="email" 
                       placeholder="Your email here.." 
                       value={email} 
                       onChange={event => setEmail(event.target.value)} />

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