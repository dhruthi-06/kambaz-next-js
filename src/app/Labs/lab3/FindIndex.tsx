export default function FindIndex () {
    const numberarray = [1,2,3,4,5];
    const stringarray = ["string 1", "string 2"];
    const fourindex = numberarray.findIndex(a => a === 4);
    const secondindex = stringarray.findIndex(a => a === "string 2");
    return (
        <div id="wd-find-index">
            <h3>Find Index Functions</h3>
            Index of 4 = {fourindex} <br/>
            Index of string 2 = {secondindex} <hr/>
        </div>
    );
}