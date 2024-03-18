const exp = require("express");
const scoreApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

scoreApp.use(exp.json());
/**
 * @swagger
 * tags:
 *   name: Score
 *   description: API endpoints related to scoring
 */

/**
 * @swagger
 * /score/post-score:
 *   post:
 *     summary: Post a new score
 *     tags: [Score]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               juryId:
 *                 type: number
 *               teamId:
 *                 type: number
 *               scores:
 *                 type: object
 *                 properties:
 *                   metric1:
 *                     type: number
 *                   metric2:
 *                     type: number
 *                   metric3:
 *                     type: number
 *                   metric4:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Score posted successfully
 *       '500':
 *         description: Internal Server Error
 */

scoreApp.post("/post-score", async (request, response) => {
  try {
    console.log(request);
    const { juryId, teamId, scores } = request.body;

    const totalScore = Object.values(scores).reduce(
      (acc, curr) => acc + curr,
      0
    );

    const scoreCollectionObject = await getDBObj("scoreCollectionObject");
    await scoreCollectionObject.insertOne({
      juryId,
      teamId,
      scores,
      totalScore,
    });

    response.send({ message: "Score posted successfully" });
  } catch (error) {
    console.error("Error while posting score:", error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});

scoreApp.get(
  "/get-teams-evaluated-by-jury/:juryId",
  expressAsyncHandler(async (request, response) => {
    try {
      const juryId = parseInt(request.params.juryId);
      const scoreCollectionObject = await getDBObj("scoreCollectionObject");

      const scores = await scoreCollectionObject.find({ juryId }).toArray();

      response.send({ message: "Scores evaluated by jury", payload: scores });
    } catch (error) {
      console.error("Error while retrieving scores by jury:", error);
      response.status(500).send({ error: "Internal Server Error" });
    }
  })
);

module.exports = scoreApp;
