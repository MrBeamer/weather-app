import React from "react";

export default function Loader(props) {
  return (
    <div className={props.time < 18 ? "app warm" : "app"}>
      <main>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
