import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getOpenAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: message,
      max_tokens: 150,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text?.trim() ?? '';
    } else {
      throw new Error('No choices found in OpenAI response');
    }
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI API');
  }
};
