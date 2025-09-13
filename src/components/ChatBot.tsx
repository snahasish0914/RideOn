import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm RideBot 🚌 How can I help you today? I can assist with bus timings, fares, traffic updates, and app support!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('timing') || message.includes('schedule') || message.includes('time')) {
      return "🕐 Bus timings vary by route:\n• Route 6A: Every 15-20 mins (6 AM - 10 PM)\n• Route 3A: Every 10-15 mins (5:30 AM - 11 PM)\n• Auto rickshaws: Available 24/7\n\nWould you like specific route timings?";
    }
    
    if (message.includes('fare') || message.includes('price') || message.includes('cost')) {
      return "💰 Current fares:\n• City Bus: ₹8-15 (based on distance)\n• AC Bus: ₹12-25\n• Auto Rickshaw: ₹10 base + ₹8/km\n• Day Pass: ₹50 (unlimited rides)\n\nStudent discounts available!";
    }
    
    if (message.includes('traffic') || message.includes('jam') || message.includes('delay')) {
      return "🚦 Current traffic status:\n• MI Road: Heavy traffic (15 min delay)\n• Tonk Road: Moderate traffic\n• JLN Marg: Clear roads\n• Sanganer: Light traffic\n\nI recommend Route 6A for faster travel!";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('problem')) {
      return "🛠️ I can help with:\n• Finding bus routes\n• Real-time tracking\n• Payment issues\n• App navigation\n• Booking tickets\n\nWhat specific issue are you facing?";
    }
    
    if (message.includes('route') || message.includes('bus') || message.includes('auto')) {
      return "🚌 Popular routes:\n• 6A: Jagatpura ↔ Jaipur Junction\n• 3A: Sanganer ↔ Choti Chaupar\n• 12B: Malviya Nagar ↔ Bani Park\n• Auto: Available for short distances\n\nWhere do you want to go?";
    }
    
    if (message.includes('nearest') || message.includes('near') || message.includes('stop')) {
      return "📍 Nearest bus stops:\n• PMCH - 12 min walk\n• City Palace - 8 min walk\n• Hawa Mahal - 15 min walk\n\nTap 'Bus stops near me' in menu for live locations!";
    }
    
    if (message.includes('ticket') || message.includes('pass') || message.includes('book')) {
      return "🎫 Booking options:\n• Single journey: ₹8-25\n• Daily pass: ₹50\n• Weekly pass: ₹300\n• Monthly pass: ₹1000\n\nUse UPI, cards, or RideOn wallet to pay!";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to make your travel easier. Ask me about:\n• Bus timings & routes\n• Live traffic updates\n• Fare information\n• Nearest stops\n• App support";
    }
    
    // Default responses
    const defaultResponses = [
      "I understand you're asking about transport. Could you be more specific? I can help with timings, routes, fares, or traffic updates! 🚌",
      "Let me help you with that! Try asking about:\n• 'Bus timings for Route 6A'\n• 'Traffic on MI Road'\n• 'Nearest bus stop'\n• 'Auto rickshaw fares'",
      "I'm here to assist with all your travel needs! What specific information are you looking for? 🛣️"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full max-w-sm mx-auto bg-white rounded-t-3xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2E7D32] text-white p-4 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">RideBot</h3>
              <p className="text-sm text-green-100">Online • Always here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#2E7D32] text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-[#2E7D32] order-1 ml-2' : 'bg-gray-200 order-2 mr-2'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 mr-2 w-8 h-8 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about timings, fares, routes..."
              className="flex-1 rounded-full border-gray-300"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-full w-10 h-10 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};