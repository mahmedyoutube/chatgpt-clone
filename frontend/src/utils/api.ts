import axios from "axios";
export const chatApi = async (data: {
  conversationId: string;
  previousMessageId: string;
  prompt: string;
}) => {
  const res = await axios.post(
    "http://localhost:5001/chatgpt-backend-26107/us-central1/generateText",
    { ...data }
  );

  return res.data;
};

export const loadAllConversation = async () => {
  const res = await axios.get(
    "http://localhost:5001/chatgpt-backend-26107/us-central1/getAllConversation"
  );

  return res.data;
};

export const getConversationById = async (id: string) => {
  const res = await axios.get(
    "http://localhost:5001/chatgpt-backend-26107/us-central1/getConversation?conversationId=" +
      id
  );

  return res.data;
};
