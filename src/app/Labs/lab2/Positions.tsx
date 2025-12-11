export default function Positions() {
    return (
        <div id="wd-positions">
            <div id="wd-relative-positions">
            <h3>Relative</h3>
            <div className="wd-bg-gray">
                <div className="wd-bg-yellow wd-dimension-portrait">
                    <div className="wd-pos-relative-nudge-down-right">Portrait</div>
                </div>
                <div className="wd-bg-blue wd-dimension-landscape wd-pos-relative-nudge-up-right wd-fg-white">
                    Landscape
                </div>
                <div className="wd-bg-red wd-dimension-square">Square</div>
            </div>
            </div>
            <div id="wd-absolute-positions">
                <h2>Absolute</h2>
                <div className="wd-pos-relative">
                    <div className="wd-pos-absolute-10-10 wd-bg-yellow wd-dimension-portrait">Portrait</div>
                    <div className="wd-pos-absolute-50-50 wd-bg-blue wd-fg-white wd-dimension-landscape">Landscape</div>
                    <div className="wd-pos-absolute-120-20 wd-bg-red wd-dimension-square">Square</div>
                </div>
                <br />
                <br /> <br /> <br /> <br /> <br /> <br /> <br />
                </div>
                <div id="wd-pos-fixed">
                    <h2>Fixed Positioning</h2>
                    Checkout the fixed position box on the right corner of the screen. It doesnt move when you scroll.
                    <div className="wd-pos-fixed wd-dimension-square wd-bg-blue wd-fg-white">Fixed Position</div>
                </div>
                <br />
            </div>
    );
}