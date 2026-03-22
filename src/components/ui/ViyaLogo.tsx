
import React from 'react';

interface ViyaLogoProps {
    className?: string;
    color?: string;
    size?: number | string;
}

const ViyaLogo: React.FC<ViyaLogoProps> = ({ className = "", color = "currentColor", size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* The V shape */}
            <path
                d="M20 25L50 85L80 25"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* The Infinity Symbol intertwined */}
            <path
                d="M30 55C30 45 40 40 50 55C60 70 70 65 70 55C70 45 60 40 50 55C40 70 30 65 30 55Z"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ViyaLogo;
