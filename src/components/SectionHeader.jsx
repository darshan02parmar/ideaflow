import React from "react";

export function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="section-header-container">
            <div className="section-header">
                <span className="section-icon">
                    <Icon size={18} />
                </span>
                <h2>{title}</h2>
            </div>
            <div className="section-divider"></div>
        </div>
    );
}
