import React, { PropsWithChildren } from "react";

interface Props {
  className?: string;
  onClick: () => void;
}

const Cell: React.FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={`w-28 h-28 border flex justify-center items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Cell;
