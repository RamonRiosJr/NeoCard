import React from 'react';
import { ThemeConfig } from '../types';

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: ThemeConfig;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, theme }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("In a real app, this would send data to your CRM!");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${theme.colors.cardBg} ${theme.colors.text}`}>
                <h3 id="modal-title" className="text-xl font-bold mb-2">Let's Connect</h3>
                <p className={`text-sm mb-4 ${theme.colors.textSecondary}`}>Share your info and I'll get back to you.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        required
                        type="text"
                        placeholder="Name"
                        aria-label="Your Name"
                        className={`w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 ${theme.colors.border}`}
                    />
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        aria-label="Your Email"
                        className={`w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 ${theme.colors.border}`}
                    />
                    <textarea
                        placeholder="Message"
                        aria-label="Your Message"
                        className={`w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 ${theme.colors.border}`}
                        rows={3}
                    ></textarea>
                    <div className="flex gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors text-gray-600 border-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-3 rounded-lg font-medium shadow-lg hover:opacity-90 transition-opacity ${theme.colors.accent} text-white`}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
