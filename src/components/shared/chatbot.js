"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";


const ChatBot = (userBodyType) => {
  console.log(userBodyType, 'kuch bt value?')
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Sthitii, your fashion assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

 

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    setIsLoading(true);
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, { text: inputMessage, isBot: false }]);
      setInputMessage("");
      const bT = userBodyType.length>0 ? userBodyType : ''

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: inputMessage,
            bodyType: bT, 
          }),
        });

        const data = await response.json();

        if (data.reply) {
          console.log(data.reply, "response data");
          setMessages((prev) => [
            ...prev,
            {
              text: data.reply,
              isBot: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error connecting to the server.", isBot: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const formatProductResponse = (text) => {
    console.log("Incoming text:", text);
    try {
      // First check if this is a product response
      if (!text.includes("ID:") || !text.includes("Name:")) { 
        return text;
      }

      // Parse the individual components
      const parts = {
        id: text.match(/ID:\s*(\d+)/)?.[1],
        name: text.match(/Name:\s*([^\n]+)/)?.[1], // Changed from Product Name to Name
        price: text.match(/Price:\s*£(\d+)/)?.[1], // Changed from $ to £
        color: text.match(/Color:\s*([^\n]+)/)?.[1],
        bodyType: text.match(/Body type fit information:\s*([^\n]+)/)?.[1],
        imageUrl: text.match(/Image URL:\s*\[.*?\]\((.*?)\)/)?.[1], // Updated to capture URL correctly
      };

      console.log("Parsed parts:", parts);

      // Get description (everything after the Image URL)
      const description = text.split(/\)/).pop()?.trim();

      if (!parts.name) return text; 

      return (
        <div className="product-card bg-white rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-lg text-gray-900">{parts.name}</h3>

          {parts.imageUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
             
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/product/${parts.id}`}
              >
                <img
                  src={parts.imageUrl}
                  alt={parts.name}
                  className="w-full h-full"
                />
              </a>
             
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm">
              <span className="font-medium">Price:</span>
              <span className="text-gray-700"> £{parts.price}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Color:</span>
              <span className="text-gray-700"> {parts.color}</span>
            </div>
          </div>

          <div className="text-sm">
            <span className="font-medium">Best For:</span>
            <span className="text-gray-700"> {parts.bodyType}</span>
          </div>

          {description && (
            <p className="text-sm text-gray-600 border-t pt-3">{description}</p>
          )}
        </div>
      );
    } catch (error) {
      console.error("Error in formatProductResponse:", error);
      return text;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl transition-all duration-300 w-[45vw] max-w-[600px] min-w-[320px]">
          {/* Chat Header */}
          <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">StyleDNA Assistant</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[380px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[90%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-gray-100 text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {message.isBot && message.text.includes("ID:")
                    ? formatProductResponse(message.text)
                    : message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
