function SignUp() {

    function CheckSignUP(e){

        e.preventDefault();
    

    }


    return (
        <form action="/action_page.php" >
            <div class="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>

                <label htmlFor="rank">Rank</label>
                <input type="text" placeholder="rank" id = "rank" ></input>

                <label htmlFor="fname">frist Name</label>
                <input type="text" placeholder="first Name" id="fname"/>

                <label htmlFor="lname">Last Name</label>
                <input type="text" placeholder="lirst Name" id="lname"/>

                <label htmlFor="unit"> Unit</label>
                <input type="text" placeholder="enter unit" id="unit" required/>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email"required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required/>

                <label htmlForr="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required/>

                <p>By creating an account you agree to our terms Privacy</p>

                <div class="clearfix">
                    <button type="button" class="cancelbtn">Cancel</button>
                    <button type="submit" class="signupbtn" onClick={CheckSignUP}>Sign Up</button>
                </div>
            </div>
        </form>

    )
}
export default SignUp;