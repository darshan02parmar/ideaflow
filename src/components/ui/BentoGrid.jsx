import React from "react";

export const BentoGrid = ({ className, children, ...props }) => {
    return (
        <div className={`bento-grid ${className || ""}`} {...props}>
            {children}
        </div>
    );
};

export const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    children,
    ...props
}) => (
    <div className={`bento-card ${className || ""}`} {...props}>
        <div className="bento-card-background">{background}</div>
        <div className="bento-card-content">
            <div className="bento-card-header">
                {Icon && <Icon className="bento-card-icon" />}
                <div>
                    <h3 className="bento-card-title">{name}</h3>
                    <p className="bento-card-description">{description}</p>
                </div>
            </div>
            <div className="bento-card-inner">
                {children}
            </div>
        </div>
    </div>
);
