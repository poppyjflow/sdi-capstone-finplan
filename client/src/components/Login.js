import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();

    function LoginHandle(e) {
        // const navigate = useNavigate();
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        // const navigate = useNavigate();

        let body = {
            "email": email,
            "password": password
        }
        if (true) {
            document.cookie = "loginStatus=true"
            document.cookie = `loginUserEmail=${email}`

            navigate('/');
        }else{
            alert('please reentry the password something is wrong')
        }

        console.log(body);
    }


    console.log(document.cookie);





    return (
        <div>
            <form action="/action_page.php">
                <label htmlFor="email">email</label>
                <input type="text" id="email" placeholder="Your email here.." />
                <label htmlFor="password">password</label>
                <input type="text" id="password" placeholder="password here" />
                <input type="submit" value="Submit" onClick={LoginHandle} />
            </form>
        </div>

    )
}
export default Login;