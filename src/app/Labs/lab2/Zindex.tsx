export default function Zindex () {
    return (
        <div id="wd-zindex">
            <h2> Z-Index</h2>
            <div className="wd-pos-relative">
                <div className="wd-pos-absolute-10-10 wd-bg-yellow wd-dimension-portrait">Portrait</div>
                    <div className="wd-zindex-bring-to-front wd-pos-absolute-50-50 wd-bg-blue wd-fg-white wd-dimension-landscape">Landscape</div>
                    <div className="wd-pos-absolute-120-20 wd-bg-red wd-dimension-square">Square</div>
            </div>
        </div>
    );
}