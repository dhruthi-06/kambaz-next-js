"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session"; // ⭐ make sure this path is correct

export default function KambazLayout({
  children,
}: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" className="d-flex">
          <div id="wdb-navigation">
            <KambazNavigation />
          </div>

          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}
