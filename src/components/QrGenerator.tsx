
import React, { useState, useCallback } from "react";
import ContentInput from "./ContentInput";
import QrDisplay from "./QrDisplay";
import { defaultQrOptions } from "@/lib/qrUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const QrGenerator = () => {
  const [content, setContent] = useState("");
  
  // Using the callback form to avoid unnecessary rerenders
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      <Card className="border border-border/50 glass">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium">Create QR Code</h2>
            <p className="text-sm text-muted-foreground">
              Enter the content you want to encode in your QR code
            </p>
          </div>
          
          <Separator className="mb-6" />
          
          <ContentInput onContentChange={handleContentChange} />
        </CardContent>
      </Card>
      
      <div className="flex flex-col justify-center">
        <QrDisplay content={content} options={defaultQrOptions} />
      </div>
    </div>
  );
};

export default QrGenerator;
