const exp = require("express");
const questionApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

questionApp.use(exp.json());

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API endpoints related to questions
 */

/**
 * @swagger
 * /questions/get-questions:
 *   get:
 *     summary: Retrieve all questions
 *     tags: [Questions]
 *     responses:
 *       '200':
 *         description: A JSON array of questions
 *       '500':
 *         description: Internal Server Error
 */
questionApp.get(
  "/get-questions",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let questions = await questionCollectionObject.find().toArray();
    response.send({ message: "Questions list", payload: questions });
  })
);

/**
 * @swagger
 * /questions/get-answered-questions:
 *   get:
 *     summary: Retrieve answered questions
 *     tags: [Questions]
 *     responses:
 *       '200':
 *         description: A JSON array of answered questions
 *       '500':
 *         description: Internal Server Error
 */
questionApp.get(
  "/get-answered-questions",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let questions = await questionCollectionObject
      .find({
        isAnswered: 1,
      })
      .toArray();
    response.send({ message: "Answered questions list", payload: questions });
  })
);

/**
 * @swagger
 * /questions/create:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             
 *     responses:
 *       '200':
 *         description: Question created successfully
 *       '500':
 *         description: Internal Server Error
 */
questionApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let newQuestionObj = request.body;
    await questionCollectionObject.insertOne(newQuestionObj);
    response.send({ message: "New question created" });
  })
);

module.exports = questionApp;
