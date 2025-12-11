export default function Padding() {
    return (
        <div id="wd-padding">
            <h2> Padding</h2>
            <div className="wd-padding-top-left wd-border-fat wd-border-red wd-border-solid wd-bg-yellow">Top Left Padding</div>
            <br />
            <div className="wd-padding-bottom-right wd-border-fat wd-border-solid wd-border-blue wd-bg-yellow">Bottom Right Padding</div>
            <br />
            <div className="wd-padding-fat wd-border-fat wd-border-yellow wd-border-solid wd-bg-blue wd-fg-white">Padded all around</div>
        </div>
    );
}