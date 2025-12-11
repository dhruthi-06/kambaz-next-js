import { useState } from "react";

export default function EventObject() {
    const [event, setEvent] = useState<Record<string, unknown> | null>(null);
    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
       const eventCopy = {
            ...e,
            target: (e.target as HTMLElement).outerHTML,
            view: undefined
        };
        setEvent(eventCopy);
    };
    
    return(
        <div id="wd-event-object">
            <h3>Event Object</h3>
            <button onClick={(e) => handleClick(e)} id="wd-event-object-button">
                Display Event on Object
            </button>
            <pre>{JSON.stringify(event,null,2)}</pre>
            <hr/>
        </div>
    );
}