/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: Error message here
 *   parameters:
 *     collectionName:
 *       name: collection
 *       in: path
 *       required: true
 *       description: The name of the collection
 *       schema:
 *         type: string
 */

const mclient = require("mongodb").MongoClient;

async function getDBObj(collection) {
  const client = await mclient.connect(process.env.dbUrl);
  let dbObj = client.db("gdsc");

  let CollectionObject = dbObj.collection(collection);
  return CollectionObject;
}

// async function createSequenceCollection() {
//   const client = await mclient.connect(process.env.dbUrl);
//   const db = client.db("gdsc");
//   await db.createCollection("sequenceCollection");
//   await db.collection("sequenceCollection").insertMany([
//     { _id: "teamIdSequence", sequence_value: 1 },
//     { _id: "userIdSequence", sequence_value: 1 },
//     // { _id: "userIdSequence", sequence_value: 1 },
//   ]);
//   console.log("Sequence collection created successfully.");
// }

// module.exports = createSequenceCollection;
module.exports = getDBObj;
