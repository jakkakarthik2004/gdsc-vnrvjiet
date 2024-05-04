const exp = require("express");
const eventApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

eventApp.use(exp.json());

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: API endpoints related to events
 */

/**
 * @swagger
 * /Events/get-past-events:
 *   get:
 *     summary: Get past events
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Past events retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
eventApp.get(
  "/get-past-events",
  expressAsyncHandler(async (request, response) => {
    let eventCollectionObject = await getDBObj("eventCollectionObject");
    let events = await eventCollectionObject
      .find({
        isPast: 1,
      })
      .toArray();
    events.reverse();
    response.send({ message: "Events list", payload: events });
  })
);

/**
 * @swagger
 * /Events/get-upcoming-events:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Upcoming events retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
eventApp.get(
  "/get-upcoming-events",
  expressAsyncHandler(async (request, response) => {
    let eventCollectionObject = await getDBObj("eventCollectionObject");
    let events = await eventCollectionObject
      .find({
        isPast: 0,
      })
      .toArray();
    events.reverse();
    response.send({ message: "Events list", payload: events });
  })
);

/**
 * @swagger
 * /Events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the new event here
 *     responses:
 *       '200':
 *         description: New event created successfully
 *       '500':
 *         description: Internal Server Error
 */
eventApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let eventCollectionObject = await getDBObj("eventCollectionObject");
    let neweventObj = request.body;

    await eventCollectionObject.insertOne({
      isPast: 0,
      ...neweventObj,
    });
    response.send({ message: "New event created" });
  })
);

module.exports = eventApp;
