import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoryFlowLayout from "../components/StoryFlowLayout";
import { getSavedIdeaById } from "../utils/savedIdeas";

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
        } else {
            navigate("/saved");
        }
    }, [id, navigate]);

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
                    <div className="action-layer">
                        <span className="qupe-badge" style={{ margin: 0 }}>SAVED BLUEPRINT</span>
                    </div>
                </div>

                <div className="saved-detail-query">
                    <h2 className="landing-section-title" style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>
                        Blueprint for: <span className="orange-text">{idea.query}</span>
                    </h2>
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
