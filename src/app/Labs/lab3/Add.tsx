export default function Add ({a,b}:{a:number, b:number}) {
    return (
        <div id="wd-add">
            <h3>ADD (Parameterizing Components)</h3>
            a = {a} <br/>
            b = {b} <br/>
            a + b = {a+b} <hr/>
        </div>
    );
}