
import React from "react";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div>
          <p>© {new Date().getFullYear()} QRmatic Toolbox. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://qrcode-monkey.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>QR Code Monkey</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
