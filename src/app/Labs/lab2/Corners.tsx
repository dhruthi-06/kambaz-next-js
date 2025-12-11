export default function Corners() {
    return (
        <div id="wd-corners">
            <h2>Rounded Corners</h2>
            <div className="wd-corner-rounded-corner-top wd-border-thin wd-border-blue wd-border-solid wd-padding-fat">Top Corners Rounded</div>
            <br />
            <div className="wd-corner-rounded-corner-bottom wd-border-thin wd-border-blue wd-border-solid wd-padding-fat">Bottom Corners Rounded</div>
            <br />
            <div className="wd-corner-rounded-corner-all-around wd-border-thin wd-border-blue wd-border-solid wd-padding-fat">All Corners Rounded</div>
            <br />
            <div className="wd-corner-rounded-corner-inline wd-border-thin wd-border-blue wd-border-solid wd-padding-fat wd-margin-all-around">Inline Element with Rounded Corners</div>
        </div>
    );
}