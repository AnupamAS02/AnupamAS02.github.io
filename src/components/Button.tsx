import React from "react";
import { cn } from "@utils/index";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  href?: string;
  target?: string;
};

const Button = ({
  children,
  className = "",
  href,
  target,
  ...props
}: ButtonProps) => {
  const classes = cn(
    `rounded-md flex items-center justify-center bg-accent px-6 h-10 font-mono font-medium text-background transition-opacity hover:opacity-90 text-sm cursor-pointer`,
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
