import React from "react";
import { z } from "zod";

const defaultMonetization = [
  "Commission per order",
  "Premium delivery subscription",
  "Sponsored restaurant listings"
];

export default function BusinessModelUI({ monetization }) {
  const streams =
    monetization && monetization.length > 0 ? monetization : defaultMonetization;

  return (
    <div className="monetization-wrapper">
      <div className="monetization-header">
        <span className="card-header-small">MONETIZATION MODEL</span>
        <p className="section-intro">
          Clear revenue paths that make the product feel investor-ready.
        </p>
      </div>
      <div className="monetization-grid">
        {streams.map((stream, index) => (
          <div key={`${stream}-${index}`} className="monetization-card">
            <div className="monetization-badge">Revenue Stream {index + 1}</div>
            <p className="monetization-text">{stream}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

BusinessModelUI.propsSchema = z.object({
  monetization: z
    .array(z.string())
    .describe("List of revenue streams or monetization strategies")
    .optional()
    .default([])
});
