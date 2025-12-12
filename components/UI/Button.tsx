import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-custom-darkBg";
  
  const variants = {
    primary: "bg-custom-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-gray-100 text-custom-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 hover:-translate-y-0.5",
    outline: "border border-gray-200 dark:border-gray-700 text-custom-black dark:text-white hover:border-gray-400 dark:hover:border-gray-500 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5",
    ghost: "text-custom-mediumGray hover:text-custom-black dark:text-custom-darkTextMuted dark:hover:text-white bg-transparent hover:bg-gray-50 dark:hover:bg-white/5"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};