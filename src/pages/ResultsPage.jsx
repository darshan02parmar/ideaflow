import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTambo } from "@tambo-ai/react";
import Hero from "../components/Hero";
import StoryFlowLayout from "../components/StoryFlowLayout";

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

    const generate = React.useCallback(async (prompt) => {
        if (!prompt) return;

        try {
            // Small delay for cinematic feel
            await new Promise(r => setTimeout(r, 500));
            const masterPrompt = `
You are an expert AI Product Designer.
Your task is to always generate a COMPLETE product plan for the given idea.
User idea: ${prompt}

Special Requirements for "IdeaOverviewUI":
1. provide a one-sentence "AI Insight" (psychological trigger/market fit).
2. identify "Target Users" (e.g. Students, professionals).
3. identify 4 "Value Tags" (core pillars like Goal-driven, progress tracking).
4. provide a "Market Signal" (viability analysis).

Special Requirements for "ProblemsWeSolveUI":
1. provide 3 concise "painPoints" (user pain points).

Special Requirements for "BusinessModelUI":
1. provide 3 concise "monetization" revenue streams.
`;
            await sendThreadMessage(masterPrompt);
        } catch (error) {
            console.error("Generation failed:", error);
            alert("⚠️ Connection interrupted. Please check your internet and try again.");
        }
    }, [sendThreadMessage]);

    const [isRewriting, setIsRewriting] = React.useState(false);
    const [toast, setToast] = React.useState({ open: false, message: "" });
    const [copyActive, setCopyActive] = React.useState(false);
    const toastTimer = useRef(null);

    const showToast = (message) => {
        setToast({ open: true, message });
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast({ open: false, message: "" });
        }, 2600);
    };


    const handleRewriteOverview = async () => {
        if (isRewriting) return;
        setIsRewriting(true);
        try {
            const rewritePrompt = "Rewrite only the Product Summary, AI Insight, Target Users and Market Signal to be more creative and compelling. Keep the others as they are.";
            await sendThreadMessage(rewritePrompt);
        } catch (error) {
            console.error("Rewrite failed:", error);
            alert("⚠️ Failed to rewrite. Please check your connection.");
        } finally {
            setIsRewriting(false);
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

    const handleReset = () => {
        navigate("/");
        window.location.reload(); // Hard reset for fresh state
    };

    // Trigger generation on mount or query change
    useEffect(() => {
        if (query) {
            generate(decodeURIComponent(query));
        }
    }, [query]);

    return (
        <div className="results-page-wrapper">
            <Hero
                onSubmit={(p) => navigate(`/search/${encodeURIComponent(p)}`)}
                setInput={setInput}
                inputValue={inputValue}
                isCompact={true}
            />

            <div className="results-container" ref={resultsRef} id="results">

                <div className="reset-button-container">
                    <button className="reset-btn" onClick={handleReset}>
                        ✨ Start New Idea
                    </button>
                    <div className="action-layer">
                        <button className="action-btn" onClick={() => showToast("PDF export is coming soon.")}>📄 Export PDF</button>
                        <button className={`action-btn ${copyActive ? "copy-success" : ""}`} onClick={handleCopy}>🔗 Copy Plan</button>
                        <button className="action-btn" onClick={() => showToast("Share link copied.")}>📤 Share</button>
                    </div>
                </div>

                {messages.length === 0 && (
                    <div className="loading-state">
                        <p className="loading-text">✨ Generating product flow...</p>
                    </div>
                )}

                <React.Suspense fallback={<LoadingCard />}>
                    <StoryFlowLayout>
                        {messages.map((msg) => {
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
                                            isRewriting={isRewriting}
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


            <div className={`toast ${toast.open ? "show" : ""}`} role="status" aria-live="polite">
                <div className="toast-icon" aria-hidden="true" />
                <div className="toast-content">
                    <div className="toast-title">Success!</div>
                    <div className="toast-message">{toast.message}</div>
                </div>
                <button className="toast-close" onClick={() => setToast({ open: false, message: "" })}>
                    X
                </button>
                <div className="toast-progress" />
            </div>

        </div>
    );
}
