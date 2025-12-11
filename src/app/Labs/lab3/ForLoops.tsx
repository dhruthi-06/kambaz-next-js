export default function ForLoops() {
    const stringarray = ["string 1, ", "string 2"];
    const stringarray2 = [];
    for (let i=0 ; i<stringarray.length; i++) {
        const string1 = stringarray[i];
        stringarray2.push(string1.toUpperCase());
    }
    return (
        <div id="wd-for-loops">
            <h3>For Loops</h3>
            Array in small letters = {stringarray} <br/>
            Array in Capital letters = {stringarray2} <hr/>
        </div>
    );
}