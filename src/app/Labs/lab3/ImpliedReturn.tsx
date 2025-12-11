const multiply = (a:number,b:number) => a*b;
const fourtimesfive = multiply(4,5);
console.log(fourtimesfive);
export default function ImpliedReturn () {
    return (
        <div id="wd-implied-return">
            <h3>Implied Return</h3>
            fourtimesfive = {fourtimesfive}<br/>
            multiply (3,4) = {multiply(3,4)} <hr/>
        </div>
    );
}