import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

export default function HeroPage({ setInput, inputValue }) {
    const navigate = useNavigate();

    const handleGenerate = (prompt) => {
        if (!prompt.trim()) return;
        // Navigate to the results page with the prompt as a URL param
        navigate(`/search/${encodeURIComponent(prompt)}`);
    };

    return (
        <div className="page-hero-wrapper">
            <Hero
                onSubmit={handleGenerate}
                setInput={setInput}
                inputValue={inputValue}
                isCompact={false}
            />
            {/* <div className="landing-hint">
                <p>Start by describing a product idea above. IdeaFlow will generate a structured plan.</p>
            </div> */}
        </div>
    );
}
