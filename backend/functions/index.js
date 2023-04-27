const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

admin.initializeApp();
const db = admin.firestore();

const collectionTypes = { histories: "histories" };

const generateChatGPTResponse = async (prompt) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });

  return completion.data.choices[0].text;
};

const insertNewRecord = async (docRef, prompt, res) => {
  const id = docRef.id;

  await docRef.set({ responses: [{ prompt, res }] });

  return id;
};

const getDocRef = async (id) => {
  let docRef;

  if (id) {
    docRef = db.collection(collectionTypes.histories).doc(id);
  } else {
    docRef = db.collection(collectionTypes.histories).doc();
  }

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

  const { prompt, id: defaultId } = request.body;

  if (!prompt) {
    return response.status(400).send({ message: "'prompt' arg is required" });
  }

  let id = defaultId;
  const res = await generateChatGPTResponse(prompt);

  let responses = [];

  const docRef = await getDocRef(id);

  if (id) {
    const doc = await docRef.get();
    if (!doc.exists) {
      id = await insertNewRecord(docRef, prompt, res);
    } else {
      const data = doc.data();
      responses = [...(data?.responses || []), { prompt, res }];
      await docRef.update({ responses });
    }
  } else {
    id = await insertNewRecord(docRef, prompt, res);
  }

  try {
    return response.send({ recordId: id, prompt, res });
  } catch (err) {
    console.log("err ", err);
    response.status(500).send({ err: "Internal error." });
  }
});
