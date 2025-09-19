
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// A static image is used to prevent API quota errors and improve reliability.
const STATIC_IMAGE_URL = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop';

const ConceptualGraphic: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { t } = useTranslation();
    const altText = t('homeGraphicAltText');

    return (
        <div id="conceptual-graphic-container" className="absolute inset-0 flex items-center justify-center z-0">
            <img
                id="conceptual-graphic-image"
                src={STATIC_IMAGE_URL}
                alt={altText}
                onLoad={() => setIsLoaded(true)}
                className={`
                    w-1/2 md:w-1/3 max-w-lg
                    object-contain
                    transition-opacity duration-1000 ease-in-out
                    ${isLoaded ? 'opacity-10 md:opacity-20' : 'opacity-0'}
                `}
            />
        </div>
    );
};

export default ConceptualGraphic;
