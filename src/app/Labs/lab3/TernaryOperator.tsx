export default function TernaryOperator() {
   const loggedin = true; 
    return (
        <div id="wd-ternary-operator">
            <h3>Logged in</h3>
            {loggedin?<p>Welcome</p>:<p>Please Log in</p>} <hr/>
        </div>
    );
}