import React from 'react';

interface ChatThreadProps {
  messages: { sender: string; text: string }[];
}

const ChatThread: React.FC<ChatThreadProps> = ({ messages }) => {
  return (
    <div className="p-4">
      {messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatThread;
