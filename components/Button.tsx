import React from "react";

type ComponentProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ComponentProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
