import React from "react";
import { z } from "zod";
import { Plus, X } from "lucide-react";

const defaultPainPoints = [
  "Hard to decide what to eat",
  "Long delivery times",
  "Hidden delivery fees"
];

export default function ProblemsWeSolveUI({ painPoints, isEditing = false, onUpdate }) {
  const points =
    painPoints && painPoints.length > 0 ? painPoints : defaultPainPoints;

  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    onUpdate({ painPoints: newPoints });
  };

  const handleAddPoint = () => {
    onUpdate({ painPoints: [...points, "New pain point..."] });
  };

  const handleRemovePoint = (index) => {
    onUpdate({ painPoints: points.filter((_, i) => i !== index) });
  };

  return (
    <div className={`pain-points-wrapper ${isEditing ? 'editing-mode' : ''}`}>
      <div className="pain-points-header">
        <span className="card-header-small">USER PAIN POINTS</span>
        <p className="section-intro">
          These are the core frustrations the product is designed to remove.
        </p>
      </div>
      <div className="pain-points-list">
        {points.map((point, index) => (
          <div key={`${index}`} className="pain-point-item">
            <div className="pain-point-index">
              Problem {index + 1}
              {isEditing && (
                <button className="remove-point-btn" onClick={() => handleRemovePoint(index)}>
                  <X size={12} />
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea
                className="editable-textarea point-edit"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
              />
            ) : (
              <p className="pain-point-text">{point}</p>
            )}
          </div>
        ))}
        {isEditing && (
          <button className="add-point-btn" onClick={handleAddPoint}>
            <Plus size={16} /> Add Problem
          </button>
        )}
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
