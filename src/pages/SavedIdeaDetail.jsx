import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoryFlowLayout from "../components/StoryFlowLayout";
import { getSavedIdeaById, updateIdeaTitle, updateIdeaData } from "../utils/savedIdeas";
import { Edit2, Check, X } from "lucide-react";

const COMPONENT_MAP = {
    IdeaOverviewUI: React.lazy(() => import("../components/IdeaOverviewUI")),
    ProblemsWeSolveUI: React.lazy(() => import("../components/ProblemsWeSolveUI")),
    FeaturesUI: React.lazy(() => import("../components/FeaturesUI")),
    UserFlowUI: React.lazy(() => import("../components/UserFlowUI")),
    TechStackUI: React.lazy(() => import("../components/TechStackUI")),
    RoadmapUI: React.lazy(() => import("../components/RoadmapUI")),
    BusinessModelUI: React.lazy(() => import("../components/BusinessModelUI"))
};

const LoadingCard = () => (
    <div className="card loading-card">
        <p>Loading section...</p>
    </div>
);

export default function SavedIdeaDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [idea, setIdea] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPage, setIsEditingPage] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [toast, setToast] = useState({ open: false, message: "", type: "success", title: "Success!" });
    const toastTimer = useRef(null);

    const showToast = (message, type = "success", title = "Success!") => {
        setToast({ open: true, message, type, title });
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast({ open: false, message: message, type: type, title: title });
        }, 2600);
    };

    useEffect(() => {
        const savedIdea = getSavedIdeaById(id);
        if (savedIdea) {
            setIdea(savedIdea);
            setEditValue(savedIdea.query);
        } else {
            navigate("/saved");
        }
    }, [id, navigate]);

    const handleSaveTitle = () => {
        if (!editValue.trim()) return;
        updateIdeaTitle(id, editValue);
        setIdea({ ...idea, query: editValue });
        setIsEditing(false);
        showToast("Blueprint title updated successfully!");
    };

    const handleCancelEdit = () => {
        setEditValue(idea.query);
        setIsEditing(false);
    };

    const handleSectionUpdate = (sectionName, newData) => {
        const updatedIdeaData = {
            ...idea.data,
            [sectionName]: newData
        };
        updateIdeaData(id, updatedIdeaData);
        setIdea({ ...idea, data: updatedIdeaData });
    };

    const handleToggleEditPage = () => {
        setIsEditingPage(!isEditingPage);
        if (!isEditingPage) {
            showToast("Global Edit Mode: Click on any text to edit", "success", "Info");
        } else {
            showToast("All changes saved to your blueprint!", "success", "Saved");
        }
    };

    if (!idea) return null;

    const sections = Object.entries(idea.data).map(([name, props]) => ({
        name,
        props
    }));

    return (
        <div className="results-page-wrapper">
            <div className="results-container" id="results">
                <div className="reset-button-container">
                    <button className="reset-btn-saved" onClick={() => navigate("/saved")}>
                        ← Back to Saved
                    </button>
                    <div className="action-layer" style={{ display: 'flex', gap: '12px' }}>
                        <button
                            className={`action-btn ${isEditingPage ? 'active' : ''}`}
                            onClick={handleToggleEditPage}
                            style={{
                                background: isEditingPage ? 'rgba(255, 122, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: isEditingPage ? 'white' : 'rgba(255,255,255,0.7)',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: isEditingPage ? 'var(--qupe-orange)' : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            {isEditingPage ? "✅ Save Blueprint" : "📝 Edit Blueprint"}
                        </button>
                        <span className="qupe-badge" style={{ margin: 0 }}>SAVED BLUEPRINT</span>
                    </div>
                </div>

                <div className="saved-detail-query">
                    <div className="edit-title-container">
                        {isEditing ? (
                            <div className="edit-mode-wrapper">
                                <input
                                    type="text"
                                    className="edit-query-input"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSaveTitle();
                                        if (e.key === "Escape") handleCancelEdit();
                                    }}
                                />
                                <div className="edit-actions">
                                    <button className="edit-action-btn save" onClick={handleSaveTitle}>
                                        <Check size={18} />
                                    </button>
                                    <button className="edit-action-btn cancel" onClick={handleCancelEdit}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h2 className="landing-section-title" style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>
                                Blueprint for: <span className="orange-text">{idea.query}</span>
                                <button className="edit-title-trigger" onClick={() => setIsEditing(true)}>
                                    <Edit2 size={18} />
                                </button>
                            </h2>
                        )}
                    </div>
                </div>

                <React.Suspense fallback={<LoadingCard />}>
                    <StoryFlowLayout isStatic={true}>
                        {sections.map(({ name, props }) => {
                            const Component = COMPONENT_MAP[name];
                            if (Component) {
                                return (
                                    <Component
                                        key={name}
                                        {...props}
                                        componentName={name}
                                        isStatic={true}
                                        isEditing={isEditingPage}
                                        onUpdate={(newData) => handleSectionUpdate(name, newData)}
                                        showToast={showToast}
                                    />
                                );
                            }
                            return null;
                        })}
                    </StoryFlowLayout>
                </React.Suspense>
            </div>

            {/* Toast Notification System */}
            <div className={`toast ${toast.type} ${toast.open ? "show" : ""}`} role="status" aria-live="polite">
                <div className="toast-icon" aria-hidden="true" />
                <div className="toast-content">
                    <div className="toast-title">{toast.title}</div>
                    <div className="toast-message">{toast.message}</div>
                </div>
                <button className="toast-close" onClick={() => setToast({ ...toast, open: false })}>Close</button>
                <div className="toast-progress" />
            </div>
        </div>
    );
}
