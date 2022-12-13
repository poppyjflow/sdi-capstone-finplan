function SignUp() {

    // CheckSignUP()={

    // }


    return (
        <form action="/action_page.php" >
            <div class="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>

                <label htmlFor="rank">rank</label>
                <input type="text" placeholder="rank"></input>

                <label htmlFor="fname">frist Name</label>
                <input type="text" placeholder="first Name"/>

                <label htmlFor="lname">last Name</label>
                <input type="text" placeholder="Lirst Name"/>

                <label htmlFor="unit"> Please enter </label>
                <input type="text" placeholder="enter unit"/>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" />

                <label htmlForr="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" />

                <label>
                    <input type="checkbox" checked="checked" name="remember"  /> Remember me
                </label>

                <p>By creating an account you agree to our terms Privacy</p>

                <div class="clearfix">
                    <button type="button" class="cancelbtn">Cancel</button>
                    <button type="submit" class="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>

    )
}
export default SignUp;