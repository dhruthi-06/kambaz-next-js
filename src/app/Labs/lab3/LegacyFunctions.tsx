export default function LegacyFunctions () {
    function add (a:number, b:number) {
        return a+b;
    }
    const twoplusfour = add (2,4);
    console.log(twoplusfour);
    return (
        <div id="wd-legacy-functions">
            <h3>Functions</h3>
            <h4>Legacy ES5 Functions</h4>
            twoplusfour = {twoplusfour} <br/>
            add(2,4) = {add(2,4)} <hr/>
        </div>
    );
}