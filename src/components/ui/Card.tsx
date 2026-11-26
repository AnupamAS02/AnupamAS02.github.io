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
        `bg-white border border-subtle/20 rounded-xl shadow-sm w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
