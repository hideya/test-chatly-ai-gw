import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchChatHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export const fetchChatThread = async (threadId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/thread/${threadId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat thread:', error);
    return { messages: [] };
  }
};

export const sendMessage = async (threadId: string, message: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/send`, {
      threadId,
      message,
    });
    return response.data.reply;
  } catch (error) {
    console.error('Error sending message:', error);
    return '';
  }
};
