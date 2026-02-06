import React from "react";
import { z } from "zod";

const defaultMonetization = [
  "Commission per order",
  "Premium delivery subscription",
  "Sponsored restaurant listings"
];

import { Plus, X, Sparkles, Loader2 } from "lucide-react";

export default function BusinessModelUI({ monetization, isEditing = false, isImproving = false, onUpdate, onImproveAI }) {
  const streams =
    monetization && monetization.length > 0 ? monetization : defaultMonetization;

  const handleStreamChange = (index, value) => {
    const newStreams = [...streams];
    newStreams[index] = value;
    onUpdate({ monetization: newStreams });
  };

  const handleAddStream = () => {
    onUpdate({ monetization: [...streams, "New revenue stream..."] });
  };

  const handleRemoveStream = (index) => {
    onUpdate({ monetization: streams.filter((_, i) => i !== index) });
  };

  return (
    <div className={`monetization-wrapper ${isEditing ? 'editing-mode' : ''}`}>
      <div className="monetization-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '16px' }}>
        <div>
          <span className="card-header-small">MONETIZATION MODEL</span>
          <p className="section-intro" style={{ margin: 0 }}>
            Clear revenue paths that make the product feel investor-ready.
          </p>
        </div>
        {isEditing && (
          <button
            className={`improve-ai-btn small ${isImproving ? 'loading' : ''}`}
            onClick={onImproveAI}
            disabled={isImproving}
          >
            {isImproving ? <Loader2 className="spin" size={12} /> : <Sparkles size={12} />}
            {isImproving ? "Refining..." : "Improve with AI"}
          </button>
        )}
      </div>
      <div className="monetization-grid">
        {streams.map((stream, index) => (
          <div key={`${index}`} className="monetization-card">
            <div className="monetization-badge">
              Revenue Stream {index + 1}
              {isEditing && (
                <button className="remove-stream-btn" onClick={() => handleRemoveStream(index)}>
                  <X size={10} />
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea
                className="editable-textarea stream-edit"
                value={stream}
                onChange={(e) => handleStreamChange(index, e.target.value)}
              />
            ) : (
              <p className="monetization-text">{stream}</p>
            )}
          </div>
        ))}
        {isEditing && (
          <button className="add-stream-btn" onClick={handleAddStream}>
            <Plus size={16} /> Add Stream
          </button>
        )}
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
