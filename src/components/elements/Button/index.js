import clsx from 'clsx';
import React from 'react';

const Button = ({ children, className, type = 'button', loading = false, outline = false, rounded = false, ...rest }) => {
  return (
    <button
      type={type}
      className={clsx(
        outline
          ? 'text-gray-900 bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
          : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-center',
        rounded ? 'rounded-full' : 'rounded-lg',
        'py-1.5 px-3 text-sm font-medium text-center',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
