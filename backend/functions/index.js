const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

let api;

(async () => {
  const { ChatGPTAPI } = await import("./libs/ChatGpt.mjs");
  api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
})();

admin.initializeApp();
const db = admin.firestore();

const collectionTypes = { histories: "histories" };

const generateChatGPTResponse = async (prompt, parentMessageId) => {
  // you can watch video 4 optional where I used my own chatgpt library instead of openAi library
  // you can also use openai library
  const res = await api.sendMessage(prompt, { parentMessageId });
  return { text: res.text, id: res.id };
};

const getDocRef = async (id) => {
  const docRef = db.collection(collectionTypes.histories).doc(id);

  return docRef;
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.generateText = functions.https.onRequest(async (request, response) => {
  // functions.logger.info("Hello logs!", { structuredData: true });

  if (request.method === "DELETE") {
    const { id } = request.query;

    if (!id) {
      return response.status(400).send({ message: "'id' is required" });
    }

    const docRef = await getDocRef(id);

    try {
      await docRef.delete();
      return response.send({ message: "record is deleted successfully" });
    } catch (err) {
      console.log("err ", err);
      response.status(500).send({ err: "Internal error." });
    }
  }

  if (request.method !== "POST") {
    return response
      .status(400)
      .send({ message: "only post method is supported" });
  }

  const {
    prompt,
    conversationId: defaultConversationid,
    previousMessageId,
  } = request.body;

  if (!prompt) {
    return response.status(400).send({ message: "'prompt' arg is required" });
  }

  let conversationId = defaultConversationid;
  let messageId, text;

  try {
    const response = await generateChatGPTResponse(prompt, previousMessageId);
    conversationId = conversationId || response.id;
    messageId = response.id;
    text = response.text;
  } catch (err) {}

  let responses = [];

  const docRef = await getDocRef(conversationId);

  const doc = await docRef.get();
  if (!doc.exists) {
    await docRef.set({ responses: [{ prompt, text }] });
  } else {
    const data = doc.data();
    responses = [...(data?.responses || []), { prompt, text }];
    await docRef.update({ responses });
  }

  try {
    return response.send({ conversationId, messageId, prompt, text });
  } catch (err) {
    console.log("err ", err);
    response.status(500).send({ err: "Internal error." });
  }
});

exports.getConversation = functions.https.onRequest(
  async (request, response) => {
    // functions.logger.info("Hello logs!", { structuredData: true });

    if (request.method !== "GET") {
      return response
        .status(400)
        .send({ message: "only post method is supported" });
    }

    const { conversationId } = request.query;

    if (!conversationId) {
      return response
        .status(400)
        .send({ message: "'conversationId' arg is required" });
    }

    const docRef = await getDocRef(conversationId);

    const doc = await docRef.get();

    const data = doc.data();

    try {
      return response.send({ responses: data?.responses || [] });
    } catch (err) {
      console.log("err ", err);
      response.status(500).send({ err: "Internal error." });
    }
  }
);
