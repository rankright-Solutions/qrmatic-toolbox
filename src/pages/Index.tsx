
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QrGenerator from "@/components/QrGenerator";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 animate-fade-in">
              Generate QR Codes Instantly
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-slide-up">
              Create beautiful QR codes for URLs, text, contact information, and more
              with our simple and intuitive tool.
            </p>
          </div>
          
          <Separator className="max-w-md mx-auto mb-12" />
          
          <QrGenerator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
