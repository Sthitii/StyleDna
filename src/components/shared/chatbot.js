'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Sthitii, your fashion assistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message! Our fashion expert will be with you shortly.",
          isBot: true
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        <div className={`bg-white rounded-lg shadow-2xl transition-all duration-300 'h-[500px]'
        }`}>
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

            <>
              {/* Chat Messages */}
              <div className="p-4 h-[380px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-black'
                          : 'bg-black text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
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
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputMessage.trim()}
                    className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          
        </div>
      )}
    </div>
  );
};

export default ChatBot;