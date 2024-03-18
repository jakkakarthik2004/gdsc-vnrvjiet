const exp = require("express");
const juryApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

// require("dotenv").config();

// juryApp.use(exp.json());

// /**
//  * @swagger
//  * tags:
//  *   name: Jury
//  *   description: API endpoints related to jury evaluations
//  */

// /**
//  * @swagger
//  * /jury/create:
//  *   post:
//  *     summary: Create a new jury evaluation
//  *     tags: [Jury]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               juryName:
//  *                 type: string
//  *               teamName:
//  *                 type: string
//  *               teamLead:
//  *                 type: string
//  *               metrics:
//  *                 type: object
//  *                 properties:
//  *                   metric1:
//  *                     type: number
//  *                   metric2:
//  *                     type: number
//  *     responses:
//  *       '200':
//  *         description: Jury evaluation created successfully
//  *       '500':
//  *         description: Internal Server Error
//  */
// juryApp.post(
//   "/create",
//   expressAsyncHandler(async (request, response) => {
//     try {
//       let juryCollectionObject = await getDBObj("juryCollectionObject");
//       let { juryName, teamName, teamLead, ...metrics } = request.body;
//       await juryCollectionObject.insertOne({ teamName, teamLead, metrics });
//       response.send({ message: "Jury created with evaluation" });
//     } catch (error) {
//       console.error("Error while posting eval data", error);
//       response.status(500).send({ error: "An error occurred" });
//     }
//   })
// );

// /**
//  * @swagger
//  * /jury/create-many:
//  *   post:
//  *     summary: Create multiple juries with evaluations
//  *     tags: [Jury]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: array
//  *             items:
//  *               type: object
//  *               properties:
//  *                 teamName:
//  *                   type: string
//  *                 teamLead:
//  *                   type: string
//  *                 juries:
//  *                   type: number[]
//  *                 metrics:
//  *                   type: object
//  *                   properties:
//  *                     creativity:
//  *                       type: number
//  *                     FutureScope:
//  *                       type: number
//  *                     Presentation:
//  *                       type: number
//  *                     Ideation:
//  *                       type: number
//  *     responses:
//  *       '200':
//  *         description: Juries created with evaluations
//  *       '500':
//  *         description: Internal Server Error
//  */
// juryApp.post(
//   "/create-many",
//   expressAsyncHandler(async (request, response) => {
//     console.log("jury")
//     try {
//       let juryCollectionObject = await getDBObj("juryCollectionObject");
//       let juries = request.body;

//       await juryCollectionObject.insertMany(juries);
//       response.send({ message: "Juries created with evaluations" });
//     } catch (error) {
//       console.error("Error while posting eval data", error);
//       response.status(500).send({ error: "An error occurred" });
//     }
//   })
// );

// /**
//  * @swagger
//  * /jury/get-metrics:
//  *   get:
//  *     summary: Retrieve all jury evaluations
//  *     tags: [Jury]
//  *     responses:
//  *       '200':
//  *         description: A JSON array of jury evaluations
//  *       '500':
//  *         description: Internal Server Error
//  */
// juryApp.get(
//   "/get-metrics",
//   expressAsyncHandler(async (request, response) => {
//     let juryCollectionObject = await getDBObj("juryCollectionObject");
//     let evals = await juryCollectionObject.find().toArray();
//     response.send({ message: "Evaluation list", payload: evals });
//   })
// );

// module.exports = juryApp;
