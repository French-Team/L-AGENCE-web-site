
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PanelFeature } from '../types';
import { BADGE_COLORS } from './badgeConstants';

interface BadgesProps {
    features: PanelFeature[];
}

const Badges: React.FC<BadgesProps> = ({ features }) => {
    const { t } = useTranslation();

    if (!features || features.length === 0) {
        return null;
    }

    return (
        <div id="service-badges" className="flex flex-wrap items-center gap-2 mb-6">
            {features.map((feature, index) => {
                const colorClasses = BADGE_COLORS[feature.iconKey] || BADGE_COLORS.default;
                return (
                    <span
                        key={index}
                        id={`service-badge-${index}`}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}
                    >
                        {t(feature.textKey)}
                    </span>
                );
            })}
        </div>
    );
};

export default Badges;
