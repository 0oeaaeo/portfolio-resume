"use client";

import React from 'react';
import type { ReactNode } from 'react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
    index?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '', index = 0 }) => (
    <div
        className={`scroll-stack-card ${itemClassName}`.trim()}
        style={{
            top: `${80 + index * 10}px`,
            zIndex: index + 1
        }}
    >
        {children}
    </div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    gap?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    gap = 40,
}) => {
    // Clone children to pass index
    const childrenWithIndex = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { index });
        }
        return child;
    });

    return (
        <div
            className={`scroll-stack-container ${className}`.trim()}
            style={{ gap: `${gap}px` }}
        >
            {childrenWithIndex}
        </div>
    );
};

export default ScrollStack;
