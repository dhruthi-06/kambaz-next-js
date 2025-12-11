export default function Dimensions() {
    return (
        <div id="wd-dimensions">
            <h2> Dimensions</h2>
            <div className="wd-portrait wd-bg-yellow">Portrait</div>
            <div className="wd-landscape wd-bg-blue wd-fg-white">Landscape</div>
            <div className="wd-square wd-bg-red">Square</div>
            <br /> <br />
            <div className="wd-dimension-portrait wd-bg-yellow">Portrait</div>
            <div className="wd-dimension-landscape wd-bg-blue wd-fg-white">Landscape</div>
            <div className="wd-dimension-square wd-bg-red">Square</div>
        </div>
    );
}