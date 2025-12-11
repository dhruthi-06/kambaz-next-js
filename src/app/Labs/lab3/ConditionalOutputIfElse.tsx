export default function ConditionalOutputIfElse () {
    const loggedin = true;
    if (loggedin) {
        return <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>
    } else {
        return ( 
        <h2 id="wd-conditional-output-if-else-login">Please Log In</h2> 
    );
    }
}