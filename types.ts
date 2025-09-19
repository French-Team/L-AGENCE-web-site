
import React from 'react';

export interface PanelFeature {
    textKey: string;
    icon: React.FC<{ className?: string }>;
    iconKey: string;
}

export interface Review {
    author: string;
    textKey: string;
    rating: number;
}

export interface PanelData {
    id: number;
    key: string;
    titleKey: string;
    taglineKey: string;
    descriptionKey?: string; // For home page
    detailedDescriptionKey?: string; // For service modals
    features: PanelFeature[];
    rating: number;
    price?: {
        amount: number;
        currency: string;
        frequencyKey: string;
    };
    image?: string;
    reviews?: Review[];
    githubUrl?: string;
    buyUrl?: string;
    tryUrl?: string;
}

// Team member data structure
export interface TeamMember {
  id: number;
  name: string;
  roleKey: string;
  imageUrl: string;
}

// Base props shared by panel components
interface BasePanelProps {
    panelData: PanelData;
    isActive: boolean;
}

// Props for the main Panel dispatcher component
export interface PanelProps extends BasePanelProps {
    onDiscover: (panelData: PanelData) => void;
    onNavigateToFirstService?: () => void;
}

// Props for the HomePanel component
export interface HomePanelProps extends BasePanelProps {
    onNavigateToFirstService?: () => void;
}

// Props for the ServicePanel component
export interface ServicePanelProps extends BasePanelProps {
    onDiscover: (panelData: PanelData) => void;
}

// Props for the GitHubPanel component
export interface GitHubPanelProps extends BasePanelProps {}

// Props for the vertical navigation
export interface NavigationProps {
    panels: PanelData[];
    activeIndex: number;
    onNavigate: (index: number) => void;
}

// Props for the ServiceDetailModal
export interface ServiceDetailModalProps {
    panelData: PanelData;
    onClose: () => void;
    onNavigateToGithub?: () => void;
}