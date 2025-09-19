
import React from 'react';
import VisualBrowserElement from './VisualBrowserElement';
import LlmChatbotElement from './LlmChatbotElement';
import ProjectCreatorElement from './ProjectCreatorElement';
import ControlCenterElement from './ControlCenterElement';
import TailwindConfiguratorElement from './TailwindConfiguratorElement';

interface FictionalElementProps {
    panelKey: string;
    isActive: boolean;
}

const FictionalElement: React.FC<FictionalElementProps> = ({ panelKey, isActive }) => {
    switch (panelKey) {
        case 'visualBrowser':
            return <VisualBrowserElement isActive={isActive} />;
        case 'llmChatbot':
            return <LlmChatbotElement isActive={isActive} />;
        case 'projectCreator':
            return <ProjectCreatorElement isActive={isActive} />;
        case 'controlCenter':
            return <ControlCenterElement isActive={isActive} />;
        case 'tailwindConfigurator':
            return <TailwindConfiguratorElement isActive={isActive} />;
        default:
            return null;
    }
};

export default FictionalElement;
