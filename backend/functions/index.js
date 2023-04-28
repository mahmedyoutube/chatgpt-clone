const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp();

const db = admin.firestore();

const collectionList = { histories: "histories" };

let api;

(async () => {
  const { ChatGPTAPI } = await import("./libs/ChatGpt.mjs");
  api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
})();

const logs = (text) => {
  functions.logger.info(text, {
    structuredData: true,
  });
};

const callChatGPTApi = async (prompt, parentMessageId) => {
  const res = await api.sendMessage(prompt, { parentMessageId });

  return { text: res.text, id: res.id };
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// previous context will not pass to new chat, if you want you can consult to google, or you can work with chatgpt npm library
exports.generateText = functions.https.onRequest(async (request, response) => {
  //functions.logger.info("Hello logs!", { structuredData: true });

  if (request.method !== "POST") {
    return response
      .status(400)
      .send({ message: "This method is not supported" });
  }

  const { prompt, conversationId, previousMessageId } = request.body;

  if (!prompt) {
    return response.status(400).send({ message: "'prompt' arg is required" });
  }

  let res;
  let id = conversationId;

  let messageId;

  try {
    const response = await callChatGPTApi(prompt, previousMessageId);
    id = id || response.id;
    messageId = response.id;
    res = response.text;
  } catch (error) {
    if (error.response) {
      return response.status(error.response.status).send(error.response.data);
    } else {
      return response.status(500).send(error.message);
    }
  }

  // if id is present then user is using the same window instead of using the new window, so add multiple response in a same document

  let docRef;
  let responses = [];

  docRef = db.collection("histories").doc(id);

  // fetch previous response
  const doc = await docRef?.get();
  if (doc?.exists) {
    const data = doc.data();
    responses = [...data?.responses, { prompt, res }];
    await docRef?.update({ responses });
  } else {
    const responses = [{ prompt, res }];
    await docRef?.set({ responses });
  }

  try {
    // on first message, windowId === messageId
    return response.send({ windowId: id, messageId: id, res });
  } catch (err) {
    console.error("error in inserting record", err);
    return response
      .status(400)
      .send({ err: "Internal error, Pleae try again later" });
  }
});

exports.deleteWindow = functions.https.onRequest(async (request, response) => {
  //functions.logger.info("Hello logs!", { structuredData: true });

  if (request.method !== "DELETE") {
    return response
      .status(400)
      .send({ message: "This method is not supported" });
  }

  const { id } = request.query;
  if (!id) {
    return response.status(400).send({ message: "'id' arg is required" });
  }

  const docRef = db.collection(collectionList.histories).doc(id);

  try {
    await docRef.delete();
    return response.send({ message: "Deleted successfully" });
  } catch (err) {
    console.error("error in inserting record", err);
    return response
      .status(400)
      .send({ err: "Internal error, Pleae try again later" });
  }
});
