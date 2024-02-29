const mclient=require("mongodb").MongoClient;

async function getDBObj(collection) {
  const client = await mclient.connect(process.env.dbUrl);

  let dbObj = client.db("gdsc");

  let CollectionObject = dbObj.collection(collection);
  return CollectionObject;
}

module.exports = getDBObj;