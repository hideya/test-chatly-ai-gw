import React from 'react';

interface ChatHistoryProps {
  chatHistory: { id: string; title: string; timestamp: string }[];
  onSelectThread: (threadId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory, onSelectThread }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <ul>
        {chatHistory.map((thread) => (
          <li key={thread.id} className="mb-2">
            <div className="flex justify-between items-center">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => onSelectThread(thread.id)}
              >
                {thread.title}
              </button>
              <span className="text-gray-500 text-sm">{new Date(thread.timestamp).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
