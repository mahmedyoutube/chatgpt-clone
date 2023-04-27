const functions = require("firebase-functions");
const admin = require("firebase-admin");
require = require("esm")(module);
require("dotenv").config();

const {
  Configuration,
  OpenAIApi,
  ChatCompletionResponseMessageRoleEnum,
} = require("openai");

admin.initializeApp();

const db = admin.firestore();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const collectionList = { histories: "histories" };

const callChatGPTApi = async (prompt) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
  });

  return completion.data.choices[0]?.text;
};

const insertNewRecord = async (docRef, prompt, res) => {
  // insert new Record
  const id = docRef?.id;
  const responses = [{ prompt, res }];

  await docRef?.set({ responses });

  return id;
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

  const { prompt, id: defaultId } = request.body;

  let id = defaultId;
  if (!prompt) {
    return response.status(400).send({ message: "'prompt' arg is required" });
  }

  let res;

  try {
    res = await callChatGPTApi(prompt);
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
  if (id) {
    docRef = db.collection("histories").doc(id);
  } else {
    docRef = db.collection("histories").doc();
  }

  if (id) {
    // fetch previous response
    const doc = await docRef?.get();
    if (doc?.exists) {
      const data = doc.data();
      responses = [...data?.responses, { prompt, res }];
      await docRef?.update({ responses });
    } else {
      id = await insertNewRecord(docRef, prompt, res);
    }
  } else {
    id = await insertNewRecord(docRef, prompt, res);
  }

  try {
    return response.send({ recordId: id, res });
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
