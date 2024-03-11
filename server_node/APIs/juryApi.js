const exp = require("express");
const juryApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

juryApp.use(exp.json());

juryApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    try {
        let juryCollectionObject = await getDBObj("juryCollectionObject");
        let { juryName, teamName, teamLead, ...metrics } = request.body;
        // let existingJury = await juryCollectionObject.findOne({ juryName });
    
        // if (existingJury) {
        //   await juryCollectionObject.updateOne(
        //     { juryName },
        //     { $set: { teamName, teamLead, metrics } }
        //   );
        //   response.send({ message: "Jury information updated" });
        // } else
        //  {
          await juryCollectionObject.insertOne({teamName, teamLead, metrics });
          response.send({ message: "Jury created with evaluation" });
        // }
      } catch (error) {
        console.error("Error while posting eval data", error);
        response.status(500).send({ error: "An error occurred" });
      }
    }));

  juryApp.get("/get-metrics",
    expressAsyncHandler(async (request, response) => {
      let juryCollectionObject = await getDBObj("juryCollectionObject");
      let eval = await juryCollectionObject.find().toArray();
      console.log(eval)
      response.send({ message: "evaluation list", payload: eval });
    })
  );

  module.exports = juryApp;