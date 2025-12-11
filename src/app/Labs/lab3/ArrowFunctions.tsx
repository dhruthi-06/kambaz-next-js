const sub = (a:number, b:number) => {
        return a-b;
    }
export default function ArrowFunctions () {
    const threeminusone = sub(3,1);
    console.log(threeminusone);
    return (
        <div id="wd-arrow-functions">
            <h3>Arrow Functions</h3>
            threeminusone = {threeminusone} <br/>
            sub (3,1) = {sub(3,1)} <hr/>
        </div>
    );
}