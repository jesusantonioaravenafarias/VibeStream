import React, { useEffect, useRef } from 'react';
import './AdBanner.css';

const AdBanner = ({ type = 'horizontal', id }) => {
    const adRef = useRef(null);

    useEffect(() => {
        // In a real scenario, this is where you'd inject the Adsterra script.
        // Since Adsterra scripts often use document.write or async script tags,
        // we use a safe ref pattern or a placeholder for now.

        /* 
        Example Adsterra Integration:
        const script = document.createElement('script');
        script.src = `//pl12345678.highperformancegate.com/${id}/invoke.js`;
        script.async = true;
        adRef.current.appendChild(script);
        */

    }, [id]);

    return (
        <div className={`ad-container ${type}`} ref={adRef}>
            <div className="ad-placeholder">
                <span>Publicidad - {type.toUpperCase()}</span>
            </div>
        </div>
    );
};

export default AdBanner;
