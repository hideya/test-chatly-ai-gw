import express from 'express';
import { ChatThread } from '../models/chatThread';
import { getDb } from '../services/database';
import { getOpenAIResponse } from '../services/openai';

const router = express.Router();
const db = getDb();

router.post('/start', async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: 'User ID and message are required' });
  }

  try {
    const chatThread = await ChatThread.createThread({ userId, messages: [{ sender: 'user', text: message }] });
    const aiResponse = await getOpenAIResponse(message);
    chatThread.messages.push({ sender: 'ai', text: aiResponse });
    await chatThread.save();

    res.status(201).json({ message: 'Chat thread started successfully', chatThread });
  } catch (error) {
    res.status(500).json({ message: 'Error starting chat thread', error });
  }
});

router.post('/continue', async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ message: 'Thread ID and message are required' });
  }

  try {
    const chatThread = await ChatThread.findThreadByPk(parseInt(threadId, 10));

    if (!chatThread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    chatThread.messages.push({ sender: 'user', text: message });
    const aiResponse = await getOpenAIResponse(message);
    chatThread.messages.push({ sender: 'ai', text: aiResponse });
    await chatThread.save();

    res.status(200).json({ message: 'Chat thread updated successfully', chatThread });
  } catch (error) {
    res.status(500).json({ message: 'Error updating chat thread', error });
  }
});

router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const chatThreads = await ChatThread.findAllThreads({ where: { userId }, order: [['createdAt', 'DESC']] });
    res.status(200).json({ chatThreads });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat history', error });
  }
});

router.delete('/delete/:threadId', async (req, res) => {
  const { threadId } = req.params;

  try {
    const chatThread = await ChatThread.findThreadByPk(parseInt(threadId, 10));

    if (!chatThread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    await chatThread.destroy();
    res.status(200).json({ message: 'Chat thread deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat thread', error });
  }
});

export default router;
