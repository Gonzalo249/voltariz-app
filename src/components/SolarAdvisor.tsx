import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const SolarAdvisor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hola, soy tu asesor Voltariz. ¿En qué puedo ayudarte hoy con tu transición energética? Puedo ayudarte a estimar ahorros o resolver dudas técnicas.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `Eres un ingeniero experto en energía solar de la empresa 'Voltariz Energy'. 
          Tu tono es profesional, técnico pero accesible, y muy servicial. 
          Ayudas a los clientes a entender los beneficios de la energía solar, el retorno de inversión (ROI) que suele ser de 3-5 años, y la durabilidad de 25 años.
          Si te preguntan por costos, menciona que dependen del diagnóstico técnico pero que ofrecemos estudios gratuitos.
          Mantén las respuestas concisas y enfocadas en soluciones de alta ingeniería.`
        }
      });

      const assistantMessage = response.text || 'Lo siento, no pude procesar tu solicitud. Por favor intenta de nuevo.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error en la conexión. Por favor consulta con nuestros especialistas directamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-navy text-white p-4 rounded-full shadow-2xl flex items-center justify-center border border-white/10"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-8 z-50 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(3,36,93,0.2)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Voltariz Advisor</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">AI Expert Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gray-50/50"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-navy/5 text-navy' : 'bg-navy text-white'}`}>
                      {msg.role === 'assistant' ? <Sparkles size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-navy text-white rounded-tr-none' : 'bg-white border border-gray-100 text-navy rounded-tl-none shadow-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                     <Loader2 className="animate-spin text-navy" size={16} />
                     <span className="text-xs text-gray-400 font-medium italic">Voltariz está pensando...</span>
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-100 shrink-0">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pregunta sobre tu ahorro solar..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-navy hover:bg-navy hover:text-white rounded-lg transition-all disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-4 uppercase font-bold tracking-widest">Powered by Voltariz AI Precision</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
