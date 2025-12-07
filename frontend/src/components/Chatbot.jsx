import { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Chatbot = () => {
    const { backendUrl, navigate } = useContext(ShopContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Xin chào! Tôi có thể giúp bạn tìm sản phẩm. Bạn đang tìm gì?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        
        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/chatbot/chat', {
                message: userMessage
            });

            if (response.data.success) {
                const botResponse = response.data.response;
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: botResponse.text,
                    products: botResponse.products || []
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.'
                }]);
            }
        } catch (error) {
            console.log(error);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.'
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chatbot Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Open chatbot"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Trợ lý mua sắm</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    
                                    {/* Product Recommendations */}
                                    {msg.products && msg.products.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.products.map((product) => (
                                                <div
                                                    key={product._id}
                                                    onClick={() => {
                                                        navigate(`/product/${product._id}`);
                                                        setIsOpen(false);
                                                    }}
                                                    className="bg-white rounded p-2 cursor-pointer hover:bg-gray-50 border border-gray-200"
                                                >
                                                    <img
                                                        src={product.image[0]}
                                                        alt={product.name}
                                                        className="w-full h-32 object-cover rounded mb-2"
                                                    />
                                                    <p className="text-xs font-semibold text-gray-800 line-clamp-2">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-blue-600 font-bold mt-1">
                                                        {product.price.toLocaleString('vi-VN')} đ
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg p-3">
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
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;

