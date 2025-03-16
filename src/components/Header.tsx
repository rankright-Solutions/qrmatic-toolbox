
import React from "react";
import { QrCode } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 flex justify-center items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <QrCode className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">
          QRmatic Toolbox
        </h1>
      </div>
    </header>
  );
};

export default Header;
