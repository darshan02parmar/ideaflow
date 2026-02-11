import React from "react";
import Hero from "../components/Hero";

export default function HeroPage({ setInput, inputValue, onSubmit, isNavigating }) {
    React.useEffect(() => {
        setInput("");
    }, [setInput]);

    return (
        <div className="page-hero-wrapper">
            <Hero
                onSubmit={onSubmit}
                setInput={setInput}
                inputValue={inputValue}
                isNavigating={isNavigating}
            />
        </div>
    );
}
