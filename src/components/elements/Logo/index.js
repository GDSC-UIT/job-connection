import clsx from 'clsx';
import React, { forwardRef } from 'react';

const Logo = forwardRef(({ withText = false, className, ...rest }, ref) => {
  return <img className={clsx('h-10', className)} src="/logo.png" {...rest} />;
});

export default Logo;

Logo.displayName = 'Logo';
