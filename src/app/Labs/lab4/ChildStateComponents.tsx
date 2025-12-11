export default function ChildStateComponents (
    {counter, setcounter, initial} : {counter: number; setcounter: (counter: number) => void; initial: number;}
) {
    return (
        <div id="wd-child-state">
            <button onClick={() => setcounter(counter+1)} id="wd-increment-counter" className="btn btn-success me-2">Increment</button>
            <button onClick={() => setcounter(counter-1)} id="wd-decrement-counter" className="btn btn-danger me-2">Decrement</button>
            <button onClick={() => setcounter(initial)} id="wd-initial-value" className="btn btn-primary me-2">Initial Value</button>
            <hr/>
        </div>
    );
}