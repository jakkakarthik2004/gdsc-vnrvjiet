const exp = require("express");
const teamApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

teamApp.use(exp.json());

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: API endpoints related to team evaluations
 */

/**
 * @swagger
 * /team/create:
 *   post:
 *     summary: Create a new team evaluation
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *               teamLead:
 *                 type: string
 *               problemStatement:
 *                 type: string
 *               juries:
 *                 type: number[]
 *     responses:
 *       '200':
 *         description: Team evaluation created successfully
 *       '500':
 *         description: Internal Server Error
 */
teamApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    try {
      let teamCollectionObject = await getDBObj("teamCollectionObject");
      let { teamName, teamLead, problemStatement, ...metrics } = request.body;
      await teamCollectionObject.insertOne({ teamName, teamLead, metrics });
      response.send({ message: "Team created with evaluation" });
    } catch (error) {
      console.error("Error while posting eval data", error);
      response.status(500).send({ error: "An error occurred" });
    }
  })
);

/**
 * @swagger
 * /team/create-many:
 *   post:
 *     summary: Create multiple teams with evaluations
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 teamName:
 *                   type: string
 *                 teamLead:
 *                   type: string
 *                 problemStatement:
 *                   type: string
 *                 juries:
 *                   type: array
 *                   items:
 *                      type: number
 *     responses:
 *       '200':
 *         description: Juries created with evaluations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       teamId:
 *                         type: number
 *                       teamName:
 *                         type: string
 *                       teamLead:
 *                         type: string
 *                       problemStatement:
 *                         type: string
 *                       juries:
 *                         type: array
 *                         items:
 *                           type: number
 *       '500':
 *         description: Internal Server Error
 */
teamApp.post(
  "/create-many",
  expressAsyncHandler(async (request, response) => {
    try {
      let teamCollectionObject = await getDBObj("teamCollectionObject");
      let teams = request.body.map(async (team) => {
        const teamId = await getNextSequenceValue("teamIdSequence");
        return { ...team, teamId };
      });

      teams = await Promise.all(teams);
      await teamCollectionObject.insertMany(teams);

      response.send({ message: "Juries created with evaluations", teams });
    } catch (error) {
      console.error("Error while posting eval data", error);
      response.status(500).send({ error: "An error occurred" });
    }
  })
);

const getNextSequenceValue = async (sequenceName) => {
  const sequenceCollection = await getDBObj("sequenceCollection");
  const sequenceDocument = await sequenceCollection.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnOriginal: false, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

// /**
//  * @swagger
//  * /team/get-metrics:
//  *   get:
//  *     summary: Retrieve all team evaluations
//  *     tags: [Team]
//  *     responses:
//  *       '200':
//  *         description: A JSON array of team evaluations
//  *       '500':
//  *         description: Internal Server Error
//  */
// teamApp.get(
//   "/get-metrics",
//   expressAsyncHandler(async (request, response) => {
//     let teamCollectionObject = await getDBObj("teamCollectionObject");
//     let evals = await teamCollectionObject.find().toArray();
//     response.send({ message: "Evaluation list", payload: evals });
//   })
// );

/**
 * @swagger
 * /team/get-by-jury/{juryId}:
 *   get:
 *     summary: Retrieve teams evaluated by a specific jury
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: juryId
 *         required: true
 *         description: The ID of the jury
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of teams evaluated by the specified jury
 *       '500':
 *         description: Internal Server Error
 */
teamApp.get(
  "/get-by-jury/:juryId",
  expressAsyncHandler(async (request, response) => {
    try {
      const juryId = parseInt(request.params.juryId);
      const teamCollectionObject = await getDBObj("teamCollectionObject");
      const teams = await teamCollectionObject
        .find({ juries: { $in: [juryId] } })
        .toArray();
      response.send({ message: "Teams evaluated by jury", payload: teams });
    } catch (error) {
      console.error("Error while retrieving teams by jury", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

module.exports = teamApp;
