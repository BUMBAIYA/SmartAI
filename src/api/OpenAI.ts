import axios from 'axios';
import { Message } from '@/components/AIMessage';

const CHAT_GPT_URL = 'https://api.openai.com/v1/chat/completions';
const DALLE_URL = 'https://api.openai.com/v1/images/generations';

// Refrence: https://platform.openai.com/docs/api-reference/chat/create
type ChatGPTResponse = {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
};

export const chatgptApiCall = async (key: string, messages: Message[]) => {
  try {
    const client = axios.create({
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
      },
    });
    const res: ChatGPTResponse = await client.post(CHAT_GPT_URL, {
      model: 'gpt-3.5-turbo',
      messages: messages.filter((msg) => msg.role !== 'error'),
    });

    const answer = res.data.choices[0].message.content;
    return Promise.resolve({ success: true, message: answer.trim() });
  } catch {
    return Promise.resolve({ success: false, message: 'Stream error!' });
  }
};

type DalleResponse = {
  data: {
    created: number;
    data: { url: string }[];
  };
};

export const dalleApiCall = async (key: string, prompt: string) => {
  try {
    const client = axios.create({
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
      },
    });
    const res: DalleResponse = await client.post(DALLE_URL, {
      prompt,
      n: 1,
      size: '512x512',
    });

    let url = res.data.data[0].url;
    return Promise.resolve({ success: true, message: url });
  } catch (err) {
    return Promise.resolve({ success: false, message: 'Stream error!' });
  }
};
