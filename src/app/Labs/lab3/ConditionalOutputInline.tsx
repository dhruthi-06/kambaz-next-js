export default function ConditionalOutputInline () {
    const loggedin = false;
    return (
        <div id="wd-conditional-output-inline">
            {loggedin && <h3>Welcome Inline</h3>}
            {!loggedin && <h3>Please Log In inline</h3>} <hr/>
        </div>
    );
}