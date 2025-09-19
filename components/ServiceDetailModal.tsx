

import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceDetailModalProps } from '../types';
import StarRating from './StarRating';
import { XMarkIcon, GitHubIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import Badges from './Badges';
import ActionHandler from './ActionHandler';

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ panelData, onClose, onNavigateToGithub }) => {
    const { t } = useTranslation();
    const { id, titleKey, detailedDescriptionKey, image, price, rating, reviews, githubUrl, buyUrl, tryUrl, features } = panelData;
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [actionView, setActionView] = useState<'try' | 'buy' | null>(null);
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Wait for exit animation
    }, [onClose]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Carousel Logic
    useEffect(() => {
        if (!actionView && reviews && reviews.length > 1) {
            const timer = setTimeout(() => {
                setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
            }, 5000); // Change review every 5 seconds
            return () => clearTimeout(timer);
        }
    }, [currentReviewIndex, reviews, actionView]);
    
    const handlePrevReview = () => {
        if (!reviews) return;
        setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const handleNextReview = () => {
        if (!reviews) return;
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    if (!panelData) return null;

    return (
        <div 
            id={`modal-backdrop-${id}`}
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${id}`}
        >
            <div 
                id={`modal-wrapper-${id}`}
                className={`relative w-full max-w-4xl modal-glow transition-all duration-300 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div 
                    id={`modal-container-${id}`}
                    className="relative bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
                >
                    <button
                        id={`modal-close-button-${id}`}
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
                        aria-label={t('modal.closeAriaLabel')}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>

                    {image && (
                        <div id={`modal-image-container-${id}`} className="w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
                            <img src={image} alt={t(titleKey)} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div id={`modal-content-container-${id}`} className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto flex flex-col">
                        {actionView ? (
                            <ActionHandler 
                                actionType={actionView}
                                panelData={panelData}
                                onBack={() => setActionView(null)}
                                onClose={handleClose}
                            />
                        ) : (
                            <>
                                <h2 id={`modal-title-${id}`} className="text-2xl md:text-3xl font-bold text-white mb-4">{t(titleKey)}</h2>
                                
                                {detailedDescriptionKey && (
                                    <p id={`modal-description-${id}`} className="text-gray-300 mb-6">{t(detailedDescriptionKey)}</p>
                                )}

                                <Badges features={features} />

                                <div id={`modal-meta-container-${id}`} className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 rounded-lg mb-6">
                                    <div id={`modal-pricing-info-${id}`}>
                                        <h3 className="text-sm font-semibold text-gray-400 mb-1">{t('modal.pricing')}</h3>
                                        {price && (
                                            <p className="text-xl font-bold text-white">
                                                {price.currency}{price.amount} <span className="text-sm font-normal text-gray-400">{t(price.frequencyKey)}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div id={`modal-rating-info-${id}`}>
                                        <StarRating rating={rating} panelId={`modal-${id}`} />
                                    </div>
                                </div>
                                
                                <div className="flex-grow" />

                                {reviews && reviews.length > 0 && (
                                    <div id={`modal-reviews-section-${id}`} className="mb-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">{t('modal.customerReviews')}</h3>
                                        <div className="relative bg-white/5 p-4 rounded-lg min-h-[120px] flex items-center justify-center">
                                            <div key={currentReviewIndex} className="fade-in text-center">
                                                <p className="text-sm text-gray-400 italic mb-2">"{t(reviews[currentReviewIndex].textKey)}"</p>
                                                <p className="font-semibold text-gray-200 text-sm">- {reviews[currentReviewIndex].author}</p>
                                            </div>
                                            {reviews.length > 1 && (
                                                <>
                                                    <button onClick={handlePrevReview} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" aria-label={t('modal.reviewPreviousAriaLabel')}>
                                                        <ChevronLeftIcon className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={handleNextReview} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" aria-label={t('modal.reviewNextAriaLabel')}>
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div id={`modal-actions-container-${id}`} className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
                                    {githubUrl && onNavigateToGithub && (
                                        <button onClick={onNavigateToGithub} className="flex items-center gap-2 px-5 py-2.5 bg-gray-800/80 hover:bg-gray-700/80 border border-white/10 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                                            <GitHubIcon className="w-4 h-4" /> {t('modal.buttonGithub')}
                                        </button>
                                    )}
                                    {tryUrl && (
                                        <button onClick={() => setActionView('try')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20 transform hover:scale-105">
                                            {t('modal.buttonTry')}
                                        </button>
                                    )}
                                    {buyUrl && (
                                        <button onClick={() => setActionView('buy')} className="px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-green-600/20 transform hover:scale-105">
                                            {t('modal.buttonBuy')}
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal;