export default function VariableTypes () {
    const number = 123;
    const floating = 234.567;
    const string = "Hello World";
    const boolean = true;
    const isnumber = typeof number;
    const isfloating = typeof floating;
    const isstring = typeof string;
    const isboolean = typeof boolean;
    return (
        <div id="wd-variable-types">
            <h3>Variable Types</h3>
            number = {number};<br/>
            floating = {floating};<br/>
            string = {string};<br/>
            boolean = {boolean};<br/>
            isnumber = {isnumber};<br/>
            isstring = {isstring};<br/>
            isfloating = {isfloating};<br/>
            isboolean = {isboolean+ " "};<hr/>
        </div>
    );
}