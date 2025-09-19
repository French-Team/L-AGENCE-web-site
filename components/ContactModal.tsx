
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon, CheckCircleIcon } from './icons';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [isExiting, setIsExiting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
            setIsExiting(false);
            // Reset form for next time it opens
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }, 300);
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleClose]);

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = t('contactForm.error.nameRequired');
            isValid = false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contactForm.error.emailInvalid');
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = t('contactForm.error.messageRequired');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Contact form submitted:", formData);
            setIsSubmitted(true);
        }
    };
    
    const isFormValid = formData.name.trim() && /\S+@\S+\.\S+/.test(formData.email) && formData.message.trim();

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div 
                className={`relative w-full max-w-lg modal-glow transition-all duration-300 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
                     <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
                        aria-label={t('modal.closeAriaLabel')}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>

                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center text-center fade-in min-h-[300px]">
                            <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                            <h3 className="text-xl font-bold text-white">{t('contactForm.successTitle')}</h3>
                            <p className="text-gray-300 mt-2 max-w-xs">{t('contactForm.successMessage')}</p>
                            <button 
                                onClick={handleClose}
                                className="mt-6 px-6 py-2 bg-indigo-600 rounded-full text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                            >
                                {t('contactForm.buttonClose')}
                            </button>
                        </div>
                    ) : (
                        <div className="fade-in">
                            <h2 id="contact-modal-title" className="text-2xl md:text-3xl font-bold text-white mb-2">{t('contactForm.title')}</h2>
                            <p className="text-gray-400 mb-6">{t('contactForm.description')}</p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('contactForm.namePlaceholder')}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-indigo-500'}`}
                                        aria-invalid={!!errors.name}
                                        aria-describedby="name-error"
                                    />
                                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-2">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('contactForm.emailPlaceholder')}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-indigo-500'}`}
                                        aria-invalid={!!errors.email}
                                        aria-describedby="email-error"
                                    />
                                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-2">{errors.email}</p>}
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('contactForm.messagePlaceholder')}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-indigo-500'}`}
                                        aria-invalid={!!errors.message}
                                        aria-describedby="message-error"
                                    />
                                    {errors.message && <p id="message-error" className="text-red-400 text-xs mt-2">{errors.message}</p>}
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full mt-4 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    disabled={!isFormValid}
                                >
                                    {t('contactForm.buttonSend')}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
