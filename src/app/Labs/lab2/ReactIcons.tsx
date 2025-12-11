import { Bs123 } from "react-icons/bs";
import { BsAirplaneFill } from "react-icons/bs";
import { BsArrowClockwise } from "react-icons/bs";
import { FaApplePay } from "react-icons/fa6";
import { FaAws } from "react-icons/fa6";
import { VscDebug } from "react-icons/vsc";

export default function icon() {
    return (
        <div id="wd-icon-sample" className="mb-6">
            <h3>React Icon Sampler</h3>
            <div className="wd-flex" style={{display:"flex",gap:"20px"}}>
                <Bs123 className="fs-3 text" size={50}/>
                <BsAirplaneFill className="fs-3 text" size={50} />
                <BsArrowClockwise className="fs-3 text" size={50}/>
                <FaApplePay className="fs-3 text" size={50}/>
                <FaAws className="fs-3 text" size={50}/>
                <VscDebug className="fs-3 text" size={50}/>
            </div>
        </div>
    );
}