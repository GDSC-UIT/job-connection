import { forwardRef } from 'react';
import clsx from 'clsx';

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ label, className, name, type = 'text', ...rest }, ref) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        ref={ref}
        name={name}
        className={clsx(
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          className
        )}
        {...rest}
      />
    </div>
  );
});

export default Input;
