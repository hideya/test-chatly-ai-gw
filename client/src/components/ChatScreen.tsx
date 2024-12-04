import React, { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import ChatThread from './ChatThread';
import UserInput from './UserInput';
import { fetchChatHistory, fetchChatThread, sendMessage } from '../services/api';

const ChatScreen: React.FC = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  useEffect(() => {
    const loadChatHistory = async () => {
      const history = await fetchChatHistory();
      setChatHistory(history);
    };

    loadChatHistory();
  }, []);

  const handleThreadSelect = async (threadId: string) => {
    const thread = await fetchChatThread(threadId);
    setSelectedThread(threadId);
    setMessages(thread.messages);
  };

  const handleSendMessage = async (message: string) => {
    if (selectedThread === null) {
      console.error('No thread selected');
      return;
    }
    const response = await sendMessage(selectedThread, message);
    setMessages([...messages, { sender: 'user', text: message }, { sender: 'ai', text: response }]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r">
        <ChatHistory chatHistory={chatHistory} onSelectThread={handleThreadSelect} />
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatThread messages={messages} />
        </div>
        <div className="border-t p-4">
          <UserInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
