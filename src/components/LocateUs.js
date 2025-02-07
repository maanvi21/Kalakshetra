import React from "react";
import "./LocateUs.css";

export default function LocateUs({ items }) {
  return (
    <div >
      <h2>Locate our branches</h2>
      <div className="branch-grid">
        {items.map((item, index) => (
          <div key={index} className="branch">
            <h3>{item.name}</h3>
            <iframe
              src={item.mapUrl}
              width="600"
              height="200"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={item.name} // ✅ Adds unique title
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
