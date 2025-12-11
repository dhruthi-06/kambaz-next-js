export default function FilterFunction () {
    const numberarray = [1,2,3,4,5,6];
    const numbersgreaterthan2 = numberarray.filter((a) => a>2);
    const odd = numberarray.filter ((a) => a % 2 !== 0);
    const even = numberarray.filter ((a) => a % 2 === 0);
    return (
        <div id="wd-filter-function">
            <h3>Filter Functions</h3>
            Numbers greater than 2 are : {numbersgreaterthan2} <br/>
            Odd numbers are : {odd} <br/>
            Even numbers are : {even} <hr/>
        </div>
    );
}