const exp = require("express");
const questionApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { ObjectId } = require("mongodb");

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
 * /questions/get-unanswered-questions:
 *   get:
 *     summary: Retrieve unanswered questions
 *     tags: [Questions]
 *     responses:
 *       '200':
 *         description: A JSON array of unanswered questions
 *       '500':
 *         description: Internal Server Error
 */
questionApp.get(
  "/get-unanswered-questions",
  expressAsyncHandler(async (request, response) => {
    let questionCollectionObject = await getDBObj("questionCollectionObject");
    let questions = await questionCollectionObject
      .find({
        isAnswered: 0,
      })
      .toArray();
    response.send({ message: "Unanswered questions list", payload: questions });
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

/**
 * @swagger
 * /questions/get-question-by-id/{questionId}:
 *   get:
 *     summary: Retrieve a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing the question
 *       '404':
 *         description: Question not found
 *       '500':
 *         description: Internal Server Error
 */
questionApp.get(
  "/get-question-by-id/:questionId",
  expressAsyncHandler(async (request, response) => {
    try {
      const questionId = new ObjectId(request.params.questionId);
      const questionCollectionObject = await getDBObj(
        "questionCollectionObject"
      );
      const question = await questionCollectionObject.findOne({
        _id: questionId,
      });
      if (!question) {
        response.status(404).send({ error: "Question not found" });
        return;
      }
      response.send(question);
    } catch (error) {
      console.error("Error fetching question by ID:", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

/**
 * @swagger
 * /questions/update-answer/{questionId}:
 *   put:
 *     summary: Update answer
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *                 description: Updated answer
 *     responses:
 *       '200':
 *         description: Question updated successfully
 *       '404':
 *         description: Question not found
 *       '500':
 *         description: Internal Server Error
 */
questionApp.put(
  "/update-answer/:questionId",
  expressAsyncHandler(async (request, response) => {
    try {
      const questionId = new ObjectId(request.params.questionId);
      const { answer } = request.body.payload;
      const questionCollectionObject = await getDBObj(
        "questionCollectionObject"
      );
      const updatedQuestion = await questionCollectionObject.findOneAndUpdate(
        { _id: questionId },
        { $set: { answer } }
      );
      if (!updatedQuestion) {
        response.status(404).send({ error: "Question not found" });
        return;
      }

      response.send({
        message: "Question updated successfully",
        payload: updatedQuestion.value,
      });
    } catch (error) {
      console.error("Error updating question:", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

/**
 * @swagger
 * /questions/update-approval/{questionId}:
 *   put:
 *     summary: Update question approval status
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to update approval status
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Question approval status updated successfully
 *       '404':
 *         description: Question not found
 *       '500':
 *         description: Internal Server Error
 */
questionApp.put(
  "/update-approval/:questionId",
  expressAsyncHandler(async (request, response) => {
    try {
      const questionId = new ObjectId(request.params.questionId);

      const questionCollectionObject = await getDBObj(
        "questionCollectionObject"
      );
      const data = await questionCollectionObject.findOne({
        _id: questionId,
      });

      if (!data) {
        return response.status(404).send({ error: "Question not found" });
      }

      if (data.isAnswered !== undefined) {
        console.log(data.isAnswered, 1 - data.isAnswered);
        data.isAnswered = 1 - data.isAnswered;
      }

      await questionCollectionObject.updateOne(
        { _id: questionId },
        { $set: data }
      );

      response.send({
        message: "Question updated successfully",
        payload: data,
      });
    } catch (error) {
      console.error("Error updating question:", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

/**
 * @swagger
 * /questions/delete-question/{questionId}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Question deleted successfully
 *       '404':
 *         description: Question not found
 *       '500':
 *         description: Internal Server Error
 */
questionApp.delete(
  "/delete-question/:questionId",
  expressAsyncHandler(async (request, response) => {
    try {
      const questionId = new ObjectId(request.params.questionId);

      const questionCollectionObject = await getDBObj(
        "questionCollectionObject"
      );

      const result = await questionCollectionObject.deleteOne({
        _id: questionId,
      });

      if (result.deletedCount === 0) {
        return response.status(404).send({ error: "Question not found" });
      }

      response.send({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question by ID:", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

module.exports = questionApp;
