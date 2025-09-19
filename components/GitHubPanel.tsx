
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GitHubPanelProps } from '../types';
import { PANELS_DATA } from '../constants';
import { GitHubIcon } from './icons';

// Filter services with GitHub URLs, excluding the home and github panels
const githubProjects = PANELS_DATA.filter(p => p.githubUrl && p.key !== 'home' && p.key !== 'github');

const GitHubPanel: React.FC<GitHubPanelProps> = ({ panelData, isActive }) => {
    const { t } = useTranslation();

    const containerAnim = `transition-opacity duration-700 ${isActive ? 'opacity-100 delay-300' : 'opacity-0'}`;
    const stagger = (delay: string) => `transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${delay}`;

    return (
        <div id={`panel-container-${panelData.id}`} className={`w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-8 md:p-16 ${containerAnim}`}>
            <div className="text-center max-w-4xl w-full">
                <div className={stagger('delay-[400ms]')}>
                    <h2 id="github-panel-title" className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{t('githubPanelTitle')}</h2>
                    <p id="github-panel-tagline" className="mt-4 text-lg text-gray-400">{t('githubPanelTagline')}</p>
                </div>
                
                <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {githubProjects.map((project, index) => (
                        <a 
                            key={project.id}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-6 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-1 transition-all duration-300 ${stagger(`delay-[${600 + index * 100}ms]`)}`}
                        >
                            <h3 className="font-bold text-white">{t(project.titleKey)}</h3>
                            <p className="text-sm text-gray-400 mt-1">{t(project.taglineKey)}</p>
                            <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-indigo-400">
                                <GitHubIcon className="w-4 h-4" />
                                <span>{t('githubPanelViewOnGithub')}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitHubPanel;
