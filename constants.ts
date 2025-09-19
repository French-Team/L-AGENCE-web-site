
import { PanelData } from './types';
import { ChartBarIcon, ChatBubbleLeftRightIcon, CodeBracketSquareIcon, CubeTransparentIcon, PaintBrushIcon, ShieldCheckIcon } from './components/icons';

export const PANELS_DATA: PanelData[] = [
    {
        id: 1,
        key: 'home',
        titleKey: 'homeTitle',
        taglineKey: 'homeTagline',
        descriptionKey: 'homeDescription',
        features: [],
        rating: 5
    },
    {
        id: 2,
        key: 'visualBrowser',
        titleKey: 'visualBrowserTitle',
        taglineKey: 'visualBrowserTagline',
        detailedDescriptionKey: 'visualBrowserDetailedDescription',
        features: [
            { textKey: "visualBrowserFeatures.0", icon: ChartBarIcon, iconKey: 'ChartBarIcon' },
            { textKey: "visualBrowserFeatures.1", icon: CodeBracketSquareIcon, iconKey: 'CodeBracketSquareIcon' },
            { textKey: "visualBrowserFeatures.2", icon: CubeTransparentIcon, iconKey: 'CubeTransparentIcon' },
        ],
        rating: 5,
        price: { amount: 49, currency: '$', frequencyKey: 'priceFrequency.perMonth' },
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        reviews: [
            { author: 'Dev Ops Pro', textKey: 'visualBrowserReviews.0', rating: 5 },
            { author: 'Frontend Lead', textKey: 'visualBrowserReviews.1', rating: 5 },
        ],
        githubUrl: 'https://github.com/your-agency/visual-browser',
        buyUrl: '#',
        tryUrl: '#',
    },
    {
        id: 3,
        key: 'llmChatbot',
        titleKey: 'llmChatbotTitle',
        taglineKey: 'llmChatbotTagline',
        detailedDescriptionKey: 'llmChatbotDetailedDescription',
        features: [
            { textKey: "llmChatbotFeatures.0", icon: CubeTransparentIcon, iconKey: 'CubeTransparentIcon' },
            { textKey: "llmChatbotFeatures.1", icon: ChatBubbleLeftRightIcon, iconKey: 'ChatBubbleLeftRightIcon' },
            { textKey: "llmChatbotFeatures.2", icon: CodeBracketSquareIcon, iconKey: 'CodeBracketSquareIcon' },
        ],
        rating: 4,
        price: { amount: 99, currency: '$', frequencyKey: 'priceFrequency.perMonth' },
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        reviews: [
            { author: 'Support Manager', textKey: 'llmChatbotReviews.0', rating: 4 },
        ],
        githubUrl: 'https://github.com/your-agency/llm-chatbot',
        buyUrl: '#',
    },
    {
        id: 4,
        key: 'projectCreator',
        titleKey: 'projectCreatorTitle',
        taglineKey: 'projectCreatorTagline',
        detailedDescriptionKey: 'projectCreatorDetailedDescription',
        features: [
            { textKey: "projectCreatorFeatures.0", icon: CubeTransparentIcon, iconKey: 'CubeTransparentIcon' },
            { textKey: "projectCreatorFeatures.1", icon: CodeBracketSquareIcon, iconKey: 'CodeBracketSquareIcon' },
            { textKey: "projectCreatorFeatures.2", icon: ShieldCheckIcon, iconKey: 'ShieldCheckIcon' },
        ],
        rating: 5,
        price: { amount: 29, currency: '$', frequencyKey: 'priceFrequency.perUser' },
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        reviews: [
            { author: 'Tech Lead', textKey: 'projectCreatorReviews.0', rating: 5 },
            { author: 'Product Owner', textKey: 'projectCreatorReviews.1', rating: 5 },
        ],
        githubUrl: 'https://github.com/your-agency/project-creator',
        buyUrl: '#',
        tryUrl: '#',
    },
    {
        id: 5,
        key: 'controlCenter',
        titleKey: 'controlCenterTitle',
        taglineKey: 'controlCenterTagline',
        detailedDescriptionKey: 'controlCenterDetailedDescription',
        features: [
            { textKey: "controlCenterFeatures.0", icon: ShieldCheckIcon, iconKey: 'ShieldCheckIcon' },
            { textKey: "controlCenterFeatures.1", icon: ChartBarIcon, iconKey: 'ChartBarIcon' },
            { textKey: "controlCenterFeatures.2", icon: CubeTransparentIcon, iconKey: 'CubeTransparentIcon' },
        ],
        rating: 4,
        price: { amount: 149, currency: '$', frequencyKey: 'priceFrequency.perRepo' },
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80',
        reviews: [
            { author: 'CTO', textKey: 'controlCenterReviews.0', rating: 4 },
        ],
        githubUrl: 'https://github.com/your-agency/control-center',
        buyUrl: '#',
        tryUrl: '#',
    },
    {
        id: 6,
        key: 'tailwindConfigurator',
        titleKey: 'tailwindConfiguratorTitle',
        taglineKey: 'tailwindConfiguratorTagline',
        detailedDescriptionKey: 'tailwindConfiguratorDetailedDescription',
        features: [
            { textKey: "tailwindConfiguratorFeatures.0", icon: PaintBrushIcon, iconKey: 'PaintBrushIcon' },
            { textKey: "tailwindConfiguratorFeatures.1", icon: ChatBubbleLeftRightIcon, iconKey: 'ChatBubbleLeftRightIcon' },
            { textKey: "tailwindConfiguratorFeatures.2", icon: CodeBracketSquareIcon, iconKey: 'CodeBracketSquareIcon' },
        ],
        rating: 5,
        price: { amount: 19, currency: '$', frequencyKey: 'priceFrequency.oneTime' },
        image: 'https://images.unsplash.com/photo-1611180595393-8a3d16b671e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        reviews: [
            { author: 'UI/UX Designer', textKey: 'tailwindConfiguratorReviews.0', rating: 5 },
        ],
        githubUrl: 'https://github.com/your-agency/tailwind-configurator',
        tryUrl: '#',
    },
    {
        id: 7,
        key: 'github',
        titleKey: 'githubTitle',
        taglineKey: 'githubPanelTagline',
        features: [],
        rating: 5
    },
];
