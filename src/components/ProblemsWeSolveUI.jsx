import React from "react";
import { z } from "zod";

const defaultPainPoints = [
  "Hard to decide what to eat",
  "Long delivery times",
  "Hidden delivery fees"
];

export default function ProblemsWeSolveUI({ painPoints }) {
  const points =
    painPoints && painPoints.length > 0 ? painPoints : defaultPainPoints;

  return (
    <div className="pain-points-wrapper">
      <div className="pain-points-header">
        <span className="card-header-small">USER PAIN POINTS</span>
        <p className="section-intro">
          These are the core frustrations the product is designed to remove.
        </p>
      </div>
      <div className="pain-points-list">
        {points.map((point, index) => (
          <div key={`${point}-${index}`} className="pain-point-item">
            <div className="pain-point-index">Problem {index + 1}</div>
            <p className="pain-point-text">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProblemsWeSolveUI.propsSchema = z.object({
  painPoints: z
    .array(z.string())
    .describe("List of the top user pain points the product solves")
    .optional()
    .default([])
});
