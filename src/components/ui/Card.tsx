import { cn } from "@utils/index";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `bg-background border border-secondary rounded-md w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
