export default function JsonStringify () {
    const squares = [1,4,9,16,25];
    return (
        <div id="wd-json-stringify">
            <h3>JSON Stringify</h3>
            Squares = {JSON.stringify(squares)} <hr/>
        </div>
    );
}