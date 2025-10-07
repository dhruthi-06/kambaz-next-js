import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz" className="d-flex">
  
      <div className="p-3 border-end" style={{ width: "200px" }}>
        <AccountNavigation />
      </div>

   
      <div className="flex-fill p-3">
        {children}
      </div>
    </div>
  );
}
