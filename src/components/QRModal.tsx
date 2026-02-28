import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ThemeConfig } from '../types';

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: ThemeConfig;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, theme }) => {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-labelledby="qr-modal-title"
            aria-modal="true"
        >
            <div
                className={`p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 ${theme.colors.cardBg}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-white p-4 rounded-xl">
                    <QRCodeSVG value={window.location.href} size={200} />
                </div>
                <div className={`text-center ${theme.colors.text}`}>
                    <p id="qr-modal-title" className="font-bold text-lg">Scan to Save</p>
                    <p className={`text-sm ${theme.colors.textSecondary}`}>Point your camera at the QR code</p>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close QR Code"
                    className={`mt-2 px-6 py-2 rounded-full border ${theme.colors.border} ${theme.colors.text}`}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
