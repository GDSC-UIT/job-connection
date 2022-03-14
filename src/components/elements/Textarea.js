import clsx from 'clsx';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Textarea = forwardRef(({ label, className, name, ...rest }, ref) => {
  return (
    <div>
      {!!label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        name={name}
        className={clsx(
          'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
          className
        )}
        {...rest}
      />
    </div>
  );
});

export default Textarea;
