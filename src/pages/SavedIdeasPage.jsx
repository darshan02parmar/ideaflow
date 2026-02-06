import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSavedIdeas, removeIdea } from "../utils/savedIdeas";

export default function SavedIdeasPage() {
    const [savedIdeas, setSavedIdeas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSavedIdeas(getSavedIdeas());
    }, []);

    const handleDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this idea?")) {
            removeIdea(id);
            setSavedIdeas(getSavedIdeas());
        }
    };

    const truncateTitle = (text, limit = 70) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <div className="page-hero-wrapper">
            <section className="landing-section-saved">
                <div className="landing-container">
                    <h2 className="landing-section-title">Your <span className="orange-text">Saved Ideas</span></h2>

                    {savedIdeas.length === 0 ? (
                        <div className="no-saved-ideas">
                            <p className="qupe-description">You haven't saved any ideas yet. Start by describing an idea on the home page!</p>
                            <Link to="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Go to Home</Link>
                        </div>
                    ) : (
                        <div className="saved-ideas-grid">
                            {savedIdeas.map((idea) => (
                                <Link to={`/saved/${idea.id}`} key={idea.id} className="example-landing-card saved-card">
                                    <div className="card-header-small">
                                        <span className="qupe-badge" style={{ marginBottom: 0 }}>BLUEPRINT</span>
                                        <button className="delete-btn" onClick={(e) => handleDelete(e, idea.id)} title="Delete Blueprint">🗑️</button>
                                    </div>
                                    <h3 className="example-title" title={idea.query}>
                                        {truncateTitle(idea.query)}
                                    </h3>
                                    <p className="saved-date">Saved on {new Date(idea.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    <div className="card-footer-mini">
                                        <span className="open-link">Open Blueprint →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
