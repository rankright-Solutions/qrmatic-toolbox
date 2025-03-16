
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrContentType, formatQrContent } from "@/lib/qrUtils";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ContentInputProps {
  onContentChange: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ onContentChange }) => {
  const [inputType, setInputType] = useState<QrContentType>("url");
  const [inputValue, setInputValue] = useState("");

  // Update content when input changes
  useEffect(() => {
    const formattedContent = formatQrContent(inputValue, inputType);
    onContentChange(formattedContent);
  }, [inputValue, inputType, onContentChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case "url":
        return "Enter a website URL";
      case "text":
        return "Enter text content";
      case "email":
        return "Enter an email address";
      case "phone":
        return "Enter a phone number";
      case "sms":
        return "Enter a phone number for SMS";
      case "wifi":
        return "Enter WiFi network name";
      default:
        return "Enter content";
    }
  };

  return (
    <div className="w-full space-y-4 animate-slide-up">
      <Tabs 
        defaultValue="url" 
        onValueChange={(value) => setInputType(value as QrContentType)}
        className="w-full"
      >
        <TabsList className="w-full mb-4 grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="wifi">WiFi</TabsTrigger>
        </TabsList>

        <div className="relative">
          {inputType === "text" ? (
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder={getPlaceholder()}
              className="min-h-[120px] pr-10 input-subtle"
            />
          ) : (
            <Input
              type={inputType === "email" ? "email" : inputType === "phone" || inputType === "sms" ? "tel" : "text"}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={getPlaceholder()}
              className="h-12 pr-10 input-subtle"
            />
          )}
          
          {inputValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default ContentInput;
