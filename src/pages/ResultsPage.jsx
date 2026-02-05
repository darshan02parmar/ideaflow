import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTambo } from "@tambo-ai/react";
import StoryFlowLayout from "../components/StoryFlowLayout";
import html2pdf from "html2pdf.js";
import { saveIdea, removeIdea, isIdeaSaved } from "../utils/savedIdeas";

const COMPONENT_MAP = {
    IdeaOverviewUI: React.lazy(() => import("../components/IdeaOverviewUI")),
    ProblemsWeSolveUI: React.lazy(() => import("../components/ProblemsWeSolveUI")),
    FeaturesUI: React.lazy(() => import("../components/FeaturesUI")),
    UserFlowUI: React.lazy(() => import("../components/UserFlowUI")),
    TechStackUI: React.lazy(() => import("../components/TechStackUI")),
    RoadmapUI: React.lazy(() => import("../components/RoadmapUI")),
    BusinessModelUI: React.lazy(() => import("../components/BusinessModelUI"))
};

// Simple Fallback for Suspense
const LoadingCard = () => (
    <div className="card loading-card">
        <p>Loading section...</p>
    </div>
);

export default function ResultsPage({ setInput, inputValue }) {
    const { query } = useParams();
    const navigate = useNavigate();
    const { sendThreadMessage, thread } = useTambo();
    const messages = thread?.messages || [];

    const resultsRef = useRef(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRewriting, setIsRewriting] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState({});
    const [toast, setToast] = useState({ open: false, message: "", type: "success", title: "Success!" });
    const [copyActive, setCopyActive] = useState(false);
    const toastTimer = useRef(null);
    const lastGeneratedQueryRef = useRef(null);

    const generate = React.useCallback(async (prompt) => {
        if (!prompt || isGenerating) return;

        setIsGenerating(true);
        try {
            // Small initial delay to allow UI to settle
            await new Promise(r => setTimeout(r, 600));

            const masterPrompt = `
You are an expert AI Product Designer.
Your task is to generate a comprehensive product plan for: "${prompt}".

Generate appropriate sections using:
- IdeaOverviewUI (summary, target users, market signal)
- ProblemsWeSolveUI (3 core pain points)
- FeaturesUI (key capabilities)
- UserFlowUI (the user journey)
- TechStackUI (recommended stack)
- RoadmapUI (MVP milestones)
- BusinessModelUI (revenue streams)

Ensure the output is high-quality and structured for each component.
`;
            await sendThreadMessage(masterPrompt);
        } catch (error) {
            console.error("Generation failed:", error);
            showToast("The AI stream was interrupted. Please try again.", "error", "Stream Error");
        } finally {
            setIsGenerating(false);
        }
    }, [sendThreadMessage, isGenerating]);

    const showToast = (message, type = "success", title = "Success!") => {
        setToast({ open: true, message, type, title });
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast({ open: false, message: message, type: type, title: title });
        }, 2600);
    };

    const handleRewriteOverview = async () => {
        if (isRewriting || isGenerating) return;
        setIsRewriting(true);
        try {
            const rewritePrompt = "Rewrite only the Product Summary, AI Insight, Target Users and Market Signal to be more creative and compelling. Keep the others as they are.";
            await sendThreadMessage(rewritePrompt);
        } catch (error) {
            console.error("Rewrite failed:", error);
            showToast("Failed to rewrite. Please check your connection.", "error", "Network Error");
        } finally {
            setIsRewriting(false);
        }
    };

    const handleRegenerate = async (componentName) => {
        if (isRegenerating[componentName] || isGenerating) return;
        setIsRegenerating(prev => ({ ...prev, [componentName]: true }));
        try {
            const promptMap = {
                UserFlowUI: "Regenerate the User Journey with more detailed steps and a focus on viral growth loops.",
                TechStackUI: "Suggest a more modern and scalable tech stack for this product, including specific library recommendations.",
            };
            const prompt = promptMap[componentName] || `Regenerate the ${componentName} section with more creative ideas.`;
            await sendThreadMessage(prompt);
            showToast(`${componentName === 'UserFlowUI' ? 'User Journey' : 'Tech Stack'} updated successfully!`);
        } catch (error) {
            console.error(`Regenerate ${componentName} failed:`, error);
            showToast("Failed to regenerate section. Check your connection.", "error", "Network Error");
        } finally {
            setIsRegenerating(prev => ({ ...prev, [componentName]: false }));
        }
    };

    const handleToggleSave = () => {
        const id = query ? decodeURIComponent(query).toLowerCase().replace(/\s+/g, '-') : 'untitled';

        if (isSaved) {
            removeIdea(id);
            setIsSaved(false);
            showToast("Idea removed from saved list.");
        } else {
            // Only save if we have actual data
            if (messages.length === 0) {
                showToast("Wait for the plan to generate before saving.", "error", "Not Ready");
                return;
            }

            const ideaData = {
                id,
                query: decodeURIComponent(query),
                data: messages.reduce((acc, msg) => {
                    if (msg.component?.componentName && msg.component?.props) {
                        acc[msg.component.componentName] = msg.component.props;
                    }
                    return acc;
                }, {})
            };
            saveIdea(ideaData);
            setIsSaved(true);
            showToast("✨ Idea saved to your collection!");
        }
    };

    const handleCopy = () => {
        const textToCopy = messages.map(msg => {
            if (msg.component?.props) {
                return JSON.stringify(msg.component.props, null, 2);
            }
            return "";
        }).join("\n\n");
        navigator.clipboard.writeText(textToCopy);
        setCopyActive(true);
        showToast("Plan copied to clipboard!");
        setTimeout(() => setCopyActive(false), 2000);
    };

    const handleExportPDF = () => {
        const element = document.getElementById('results');
        const opt = {
            margin: 10,
            filename: `IdeaFlow-${query || 'export'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        const actionLayer = element.querySelector('.action-layer');
        const resetBtn = element.querySelector('.reset-btn');
        if (actionLayer) actionLayer.style.visibility = 'hidden';
        if (resetBtn) resetBtn.style.visibility = 'hidden';
        element.classList.add('pdf-mode');
        showToast("Generating PDF...");
        html2pdf().set(opt).from(element).save().then(() => {
            if (actionLayer) actionLayer.style.visibility = 'visible';
            if (resetBtn) resetBtn.style.visibility = 'visible';
            element.classList.remove('pdf-mode');
            showToast("PDF exported successfully!");
        }).catch(err => {
            console.error("PDF export failed:", err);
            if (actionLayer) actionLayer.style.visibility = 'visible';
            if (resetBtn) resetBtn.style.visibility = 'visible';
            element.classList.remove('pdf-mode');
            showToast("Failed to generate PDF.");
        });
    };

    const handleShare = async () => {
        const shareData = {
            title: 'IdeaFlow - Product Plan',
            text: 'Check out this product plan generated by IdeaFlow!',
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Share link copied to clipboard.");
            }
        } catch (err) {
            console.warn("Share failed or cancelled:", err);
            if (err.name !== 'AbortError') {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Share link copied to clipboard.");
            }
        }
    };

    const handleReset = () => {
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        if (query) {
            const decodedQuery = decodeURIComponent(query);

            // Strictly guard against re-triggering for the same query
            if (lastGeneratedQueryRef.current !== decodedQuery) {
                lastGeneratedQueryRef.current = decodedQuery;
                setIsSaved(isIdeaSaved(decodedQuery.toLowerCase().replace(/\s+/g, '-')));
                generate(decodedQuery);
            }
        }
    }, [query, generate]); // generate is stable due to useCallback

    // Performance Optimization: Only map active components
    const activeMessages = React.useMemo(() => {
        const seen = new Set();
        return messages.filter(msg => {
            if (msg.component?.componentName) {
                // If we've seen this component name before (coming from the end), skip older versions
                // Actually, StoryFlowLayout handles versions, but filtering here reduces React load
                return true;
            }
            return false;
        });
    }, [messages]);

    return (
        <div className="results-page-wrapper">
            <div className="results-container" ref={resultsRef} id="results">
                <div className="reset-button-container">
                    <button className="reset-btn" onClick={handleReset}>
                        ✨ Start New Idea
                    </button>
                    <div className="action-layer">
                        <button
                            className={`action-btn-save save-btn ${isSaved ? "saved" : ""}`}
                            onClick={handleToggleSave}
                            disabled={isGenerating}
                        >
                            {isSaved ? "⭐ Saved" : "☆ Save Idea"}
                        </button>
                        <button className="action-btn" onClick={handleExportPDF}>📄 Export PDF</button>
                        <button className={`action-btn ${copyActive ? "copy-success" : ""}`} onClick={handleCopy}>🔗 Copy Plan</button>
                        <button className="action-btn" onClick={handleShare}>📤 Share</button>
                    </div>
                </div>

                {(messages.length === 0 || isGenerating) && messages.length < 3 && (
                    <div className="loading-state">
                        <p className="loading-text">✨ Refining your blueprint... <span>(This may take a few seconds)</span></p>
                    </div>
                )}

                <React.Suspense fallback={<LoadingCard />}>
                    <StoryFlowLayout onRegenerate={handleRegenerate} isRegenerating={isRegenerating}>
                        {activeMessages.map((msg) => {
                            if (msg.component && typeof msg.component === 'object') {
                                const { componentName, props } = msg.component;
                                const Component = COMPONENT_MAP[componentName];
                                if (Component) {
                                    return (
                                        <Component
                                            key={msg.id}
                                            {...props}
                                            componentName={componentName}
                                            onRewrite={handleRewriteOverview}
                                            onRegenerate={() => handleRegenerate(componentName)}
                                            isRewriting={isRewriting}
                                            isRegenerating={isRegenerating[componentName]}
                                            showToast={showToast}
                                        />
                                    );
                                }
                            }
                            return null;
                        })}
                    </StoryFlowLayout>
                </React.Suspense>
            </div>

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
