export default function ArrayIndexandLength () {
    const numberarray = [1,2,3,4,5];
    const length = numberarray.length;
    const index =  numberarray.indexOf(3);
    return (
        <div id="wd-array-index-and-length">
            <h3>Array Index and Length</h3>
            Array = {numberarray} <br/>
            length of array = {length} <br/>
            index of 3  = {index} <hr/>
        </div>
    );
}