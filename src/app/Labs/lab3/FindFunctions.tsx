export default function FindFunction () {
    const numberarray = [1,2,3,4,5];
    const stringarray = ["string 1, ","string 2, ","string 3"];
    const four = numberarray.find((a)=>a===4);
    const string1 = stringarray.find((a)=>a==="string 3"); 
    return (
        <div id="wd-find-functions">
            <h3>Find functions</h3>
            four = {four} <br/>
            string3 = {string1} <hr/>
        </div>
    );
}