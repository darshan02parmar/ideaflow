import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTambo } from "@tambo-ai/react";
import StoryFlowLayout from "../components/StoryFlowLayout";
import { getSavedIdeaById, updateIdeaTitle, updateIdeaData } from "../utils/savedIdeas";
import { Edit2, Check, X, Sparkles } from "lucide-react";
import html2pdf from "html2pdf.js";
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
    const { sendThreadMessage, thread } = useTambo();
    const messages = thread?.messages || [];

    const [idea, setIdea] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPage, setIsEditingPage] = useState(false);
    const [isImproving, setIsImproving] = useState({});
    const [editValue, setEditValue] = useState("");
    const [toast, setToast] = useState({ open: false, message: "", type: "success", title: "Success!" });
    const toastTimer = useRef(null);

    // Track which section is being improved to handle streaming updates
    const activeSectionRef = useRef(null);

    const showToast = (message, type = "success", title = "Success!") => {
        setToast({ open: true, message, type, title });
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast({ open: false, message: message, type: type, title: title });
        }, 2600);
    };

    // Effect to handle streaming updates from AI for the active section
    useEffect(() => {
        if (!activeSectionRef.current) return;

        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === "assistant" && lastMessage.components?.[activeSectionRef.current]) {
            const componentData = lastMessage.components[activeSectionRef.current];
            handleSectionUpdate(activeSectionRef.current, componentData);
        }
    }, [messages]);

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

    const handleImproveSection = async (sectionName) => {
        if (isImproving[sectionName]) return;

        setIsImproving(prev => ({ ...prev, [sectionName]: true }));
        activeSectionRef.current = sectionName;

        try {
            const sectionData = idea.data[sectionName];
            const prompt = `
Refine and improve the following "${sectionName}" section for the product "${idea.query}". 
The current content is: ${JSON.stringify(sectionData)}.

Make it more professional, compelling, and consistent with the overall product vision. 
Return ONLY the updated JSON data for the ${sectionName} component.
`;
            await sendThreadMessage(prompt);
            showToast(`${sectionName} improved with AI!`, "success", "AI Refined");
        } catch (error) {
            console.error("AI Improvement failed:", error);
            showToast("AI refinement failed. Please try again.", "error", "AI Error");
        } finally {
            setIsImproving(prev => ({ ...prev, [sectionName]: false }));
            // We keep activeSectionRef.current for a bit to ensure the last stream chunk is caught
            setTimeout(() => { if (activeSectionRef.current === sectionName) activeSectionRef.current = null; }, 1000);
        }
    };

    const handleToggleEditPage = () => {
        setIsEditingPage(!isEditingPage);
        if (!isEditingPage) {
            showToast("Global Edit Mode: Click on any text to edit", "success", "Info");
        } else {
            showToast("All changes saved to your blueprint!", "success", "Saved");
        }
    };

    const handleExportPDF = async () => {
        const element = document.getElementById('results');
        if (!element) return;

        const pdfHeader = document.createElement('div');
        pdfHeader.className = 'pdf-header';
        pdfHeader.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B0B0F" stroke="#FF8A00" strokeWidth="1"/>
                <path d="M11 9V23M11 16H18.5C20.433 16 22 14.433 22 12.5C22 10.567 20.433 9 18.5 9H11M11 23H22" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div class="pdf-title-group">
                <div class="pdf-title">IDEAFLOW BLUEPRINT</div>
                <div class="pdf-subtitle">Generated by IdeaFlow AI</div>
            </div>
        `;

        const opt = {
            margin: 10,
            filename: `IdeaFlow-${idea.query.replace(/\s+/g, '-').slice(0, 20)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Preparation
        element.prepend(pdfHeader);
        element.classList.add('pdf-mode');
        showToast("Preparing blueprint for PDF export...", "success", "PDF Export");

        // Wait for styles to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // @ts-ignore - html2pdf is loaded via script or installed
            await html2pdf().set(opt).from(element).save();
            showToast("PDF exported successfully!", "success", "Complete");
        } catch (err) {
            console.error("PDF export failed:", err);
            showToast("Failed to generate PDF.", "error", "PDF Error");
        } finally {
            // Cleanup
            if (pdfHeader.parentNode) pdfHeader.parentNode.removeChild(pdfHeader);
            element.classList.remove('pdf-mode');
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
                        <button className="action-btn" onClick={handleExportPDF} style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                            📄 Export PDF
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
                                        isImproving={isImproving[name]}
                                        onUpdate={(newData) => handleSectionUpdate(name, newData)}
                                        onImproveAI={() => handleImproveSection(name)}
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
