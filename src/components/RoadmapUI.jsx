import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

export default function RoadmapUI({ phases, isEditing = false, onUpdate }) {
    const [expanded, setExpanded] = useState(false);

    const handlePhaseChange = (index, value) => {
        const newPhases = [...phases];
        newPhases[index] = value;
        onUpdate({ phases: newPhases });
    };

    const handleAddPhase = () => {
        onUpdate({ phases: [...(phases || []), "New development phase..."] });
    };

    const handleRemovePhase = (index) => {
        onUpdate({ phases: phases.filter((_, i) => i !== index) });
    };

    if ((!phases || phases.length === 0) && !isEditing) {
        return (
            <div className="empty-state">
                <p className="muted-text">No roadmap phases generated.</p>
            </div>
        );
    }

    const currentPhases = phases || [];
    const visiblePhases = expanded || isEditing ? currentPhases : currentPhases.slice(0, 5);
    const hasMore = currentPhases.length > 5 && !isEditing;

    return (
        <div className={`roadmap-wrapper ${isEditing ? 'editing-mode' : ''}`}>
            <div className="roadmap-container">
                {visiblePhases.map((phase, i) => (
                    <div key={i} className="roadmap-phase">
                        <div className="phase-badge">
                            Phase {i + 1}
                            {isEditing && (
                                <button className="remove-phase-btn-small" onClick={() => handleRemovePhase(i)}>
                                    <Trash2 size={10} />
                                </button>
                            )}
                        </div>
                        <div className="phase-content">
                            {isEditing ? (
                                <textarea
                                    className="editable-textarea phase-edit"
                                    value={phase}
                                    onChange={(e) => handlePhaseChange(i, e.target.value)}
                                />
                            ) : (
                                <p className="phase-title">{phase}</p>
                            )}
                        </div>
                    </div>
                ))}
                {isEditing && (
                    <button className="add-roadmap-btn" onClick={handleAddPhase}>
                        <Plus size={16} /> Add Phase
                    </button>
                )}
            </div>
            {hasMore && (
                <button
                    className="expansion-toggle"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "↑ Show less" : `↓ Show full roadmap (${phases.length} phases)`}
                </button>
            )}
        </div>
    );
}

RoadmapUI.propsSchema = z.object({
    phases: z
        .array(z.string())
        .describe("Phases of MVP development roadmap")
        .optional()
        .default([])
});
