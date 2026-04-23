'use client'

import React from 'react';
import Spinner from '@/components/ui/Spinner';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    loadingText?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export default function Button({ 
    children, 
    isLoading = false, 
    loadingText, 
    variant = 'primary',
    className = '',
    disabled,
    ...props 
}: Props) {
    const baseClasses = "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
        outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button 
            className={`${baseClasses} ${variants[variant]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner size="sm" color="text-current" className="mr-2" />
                    {loadingText || children}
                </>
            ) : (
                children
            )}
        </button>
    );
}
