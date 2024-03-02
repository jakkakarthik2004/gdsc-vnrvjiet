const exp = require("express");
const questionApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

questionApp.use(exp.json());



questionApp.get(
  "/get-Questions",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let questions = await questionCollectionObject.find().toArray();
    response.send({ message: "questions list", payload: questions });
  })
);

questionApp.get(
    "/get-answered-questions",
    expressAsyncHandler(async (request, response) => {
      let questionCollectionObject = await getDBObj("questionCollectionObject");
      let questions = await questionCollectionObject.find({
        isAnswered: 1
      }).toArray();
      response.send({ message: "questions list", payload: questions });
    })
  );
  

questionApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let newquestionObj = request.body;
    await questionCollectionObject.insertOne(newquestionObj);
    response.send({ message: "New question created" });
  })
);

module.exports = questionApp;
