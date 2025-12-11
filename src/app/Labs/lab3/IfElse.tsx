export default function IfElse () {
    const true1 = true, false1 = false;
    return (
        <div id="wd-if-else">
            <h3>If Else</h3>
            {true1 && <p>true1</p>}
            {!false1?<p>!false1</p>:<p>false1</p>} <hr/>
        </div>
    );
}