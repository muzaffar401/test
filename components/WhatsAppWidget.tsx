"use client";

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+1234567890"; // Replace with actual WhatsApp number
  const defaultMessage = "Hi! I'm interested in Save Ur Kids platform. Can you help me get started?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  const quickMessages = [
    { id: 1, text: "How do I get started?", message: "Hi! How can I get started with Save Ur Kids platform?" },
    { id: 2, text: "Course information", message: "I'd like to know more about the available courses and rewards." },
    { id: 3, text: "Investment opportunities", message: "I'm interested in investing in Save Ur Kids. Can you provide more information?" },
    { id: 4, text: "Technical support", message: "I need help with a technical issue on the platform." },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Save Ur Kids Support</h3>
                  <p className="text-sm opacity-90">Typically replies instantly</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Hi there! 👋 How can we help you today?
              </p>

              {/* Quick Messages */}
              <div className="space-y-2">
                {quickMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => {
                      const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg.message)}`;
                      window.open(url, '_blank');
                    }}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    {msg.text}
                  </button>
                ))}
              </div>

              {/* Direct WhatsApp Button */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Open WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}