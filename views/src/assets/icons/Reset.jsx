import React from 'react';

const Reset = ({ height = "20px", width = "20px", fill = "#000", stroke = "#000" }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" fill="none" width="20" height="20" />
            <g>
                <path
                    d="M5.7 9c.4-2 2.2-3.5 4.3-3.5 1.5 0 2.7.7 3.5 1.8l1.7-2C14 3.9 12.1 3 10 3 6.5 3 3.6 5.6 3.1 9H1l3.5 4L8 9H5.7zm9.8-2L12 11h2.3c-.5 2-2.2 3.5-4.3 3.5-1.5 0-2.7-.7-3.5-1.8l-1.7 1.9C6 16.1 7.9 17 10 17c3.5 0 6.4-2.6 6.9-6H19l-3.5-4z"
                    fill={fill}
                />
            </g>
        </svg>
    );
}

export default Reset;
