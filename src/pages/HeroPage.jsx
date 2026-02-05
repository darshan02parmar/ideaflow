import React from "react";
import Hero from "../components/Hero";

export default function HeroPage({ setInput, inputValue, onSubmit }) {
    return (
        <div className="page-hero-wrapper">
            <Hero
                onSubmit={onSubmit}
                setInput={setInput}
                inputValue={inputValue}
            />
        </div>
    );
}
