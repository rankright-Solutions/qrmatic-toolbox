
import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadQrCode, copyQrCodeToClipboard, QrOptions } from "@/lib/qrUtils";
import { Download, Copy, Scan } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface QrDisplayProps {
  content: string;
  options: QrOptions;
}

const QrDisplay: React.FC<QrDisplayProps> = ({ content, options }) => {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (!content) {
      toast({
        title: "No content",
        description: "Please enter some content to generate a QR code first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      downloadQrCode(qrRef, "qrmatic-qrcode");
      setIsLoading(false);
    }, 300);
  };

  const handleCopy = () => {
    if (!content) {
      toast({
        title: "No content",
        description: "Please enter some content to generate a QR code first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      copyQrCodeToClipboard(qrRef);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 animate-fade-in">
      <Card className="w-full max-w-md border border-border/50 overflow-hidden glass">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div 
            className={`w-[250px] h-[250px] rounded-xl bg-white flex items-center justify-center p-4 transition-opacity duration-300 ${content ? 'opacity-100' : 'opacity-50'}`}
          >
            {content ? (
              <QRCodeCanvas
                value={content || " "}
                size={options.size}
                bgColor={options.bgColor}
                fgColor={options.fgColor}
                level={options.level}
                includeMargin={options.includeMargin}
                ref={qrRef}
                className="animate-scale-in"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Scan className="h-16 w-16 opacity-20 mb-2" />
                <p className="text-sm">Enter content to generate QR code</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleDownload}
          disabled={!content || isLoading}
          variant="default"
          size="lg"
          className="btn-effect flex items-center gap-2 px-4 min-w-[120px]"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
        
        <Button
          onClick={handleCopy}
          disabled={!content || isLoading}
          variant="outline"
          size="lg"
          className="btn-effect flex items-center gap-2 px-4 min-w-[120px]"
        >
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </Button>
      </div>
    </div>
  );
};

export default QrDisplay;
