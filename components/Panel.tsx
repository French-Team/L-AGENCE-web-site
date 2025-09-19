
import React from 'react';
import { PanelProps } from '../types';
import HomePanel from './HomePanel';
import ServicePanel from './ServicePanel';
import GitHubPanel from './GitHubPanel';

const Panel: React.FC<PanelProps> = ({ panelData, isActive, onDiscover, onNavigateToFirstService }) => {
    if (panelData.key === 'home') {
        return <HomePanel panelData={panelData} isActive={isActive} onNavigateToFirstService={onNavigateToFirstService} />;
    }
    
    if (panelData.key === 'github') {
        return <GitHubPanel panelData={panelData} isActive={isActive} />;
    }

    return <ServicePanel panelData={panelData} isActive={isActive} onDiscover={onDiscover} />;
};

export default Panel;
