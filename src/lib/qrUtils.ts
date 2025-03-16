
import { toast } from "@/components/ui/use-toast";

export type QrContentType = "url" | "text" | "email" | "phone" | "sms" | "wifi";

export interface QrOptions {
  size: number;
  bgColor: string;
  fgColor: string;
  level: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
}

export const defaultQrOptions: QrOptions = {
  size: 200,
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  level: "M",
  includeMargin: true,
};

export const formatQrContent = (
  content: string,
  type: QrContentType
): string => {
  switch (type) {
    case "url":
      // Add https:// if no protocol is specified
      if (
        content &&
        !content.startsWith("http://") &&
        !content.startsWith("https://")
      ) {
        return `https://${content}`;
      }
      return content;
    case "email":
      return `mailto:${content}`;
    case "phone":
      return `tel:${content}`;
    case "sms":
      return `sms:${content}`;
    case "wifi":
      // This is a simplified version; actual WiFi QR codes have more parameters
      return `WIFI:S:${content};T:WPA;P:password;;`;
    default:
      return content;
  }
};

export const downloadQrCode = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  fileName: string = "qrcode"
): void => {
  try {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error("Canvas element not found");
    }

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been downloaded successfully.",
    });
  } catch (error) {
    console.error("Failed to download QR code:", error);
    toast({
      title: "Download Failed",
      description: "There was an error downloading your QR code.",
      variant: "destructive",
    });
  }
};

export const copyQrCodeToClipboard = (
  canvasRef: React.RefObject<HTMLCanvasElement>
): void => {
  try {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error("Canvas element not found");
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob from canvas");
      }

      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(
        () => {
          toast({
            title: "Copied to Clipboard",
            description: "QR code image copied to clipboard successfully.",
          });
        },
        (error) => {
          console.error("Could not copy QR code to clipboard:", error);
          toast({
            title: "Copy Failed",
            description: "Failed to copy QR code to clipboard.",
            variant: "destructive",
          });
        }
      );
    });
  } catch (error) {
    console.error("Failed to copy QR code to clipboard:", error);
    toast({
      title: "Copy Failed",
      description: "There was an error copying your QR code.",
      variant: "destructive",
    });
  }
};
