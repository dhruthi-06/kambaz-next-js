"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store"; // ✅ Import your Redux store
import { Provider } from "react-redux"; // ✅ Import Provider

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      {" "}
      {/* ✅ Wrap the entire layout */}
      <div id="wd-kambaz">
        <div className="d-flex">
          <div>
            <KambazNavigation />
          </div>

          <div className="wd-main-content-offset p-3 flex-fill">{children}</div>
        </div>
      </div>
    </Provider>
  );
}