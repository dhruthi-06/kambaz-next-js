import {ReactNode} from "react";
import Accountnavigation from "./navigation";  
export default function AccountLayout({ 
    children,
 }: { children: ReactNode }) {
    return (
         <div id="wd-account">
                    <div className="d-flex">
                        <div>
                            <Accountnavigation />
                        </div>
                        <div className="p-3 flex-fill" style={{maxWidth:"50%"}}>
                            {children}
                        </div>
                    </div>
                </div>
    );
}