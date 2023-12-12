const exp = require("express");
const eventApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

eventApp.use(exp.json());

eventApp.get(
  "/get-past-events",
  expressAsyncHandler(async (request, response) => {
    let eventCollectionObject = await getDBObj("eventCollectionObject");
    let events = await eventCollectionObject.find({
        isPast: 1
    }).toArray();
    response.send({ message: "events list", payload: events });
  })
);

eventApp.get(
    "/get-upcoming-events",
    expressAsyncHandler(async (request, response) => {
      let eventCollectionObject = await getDBObj("eventCollectionObject");
      let events = await eventCollectionObject.find({
          isPast: 0
      }).toArray();
      response.send({ message: "events list", payload: events });
    })
  );  

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
