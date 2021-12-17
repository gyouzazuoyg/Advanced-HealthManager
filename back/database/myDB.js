const { MongoClient } = require("mongodb");
const uri = require("./uri");
var client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();

// Yuanyuan: It is good that you seperate db part for different features instead of putting all of them into one file.
// Yuanyuan: This leads your codes become easy to follow and read. Good job!
function myDBBuilder() {
  const myDB = {};
  const DB_NAME = "health_manager_advanced";

  myDB.create = (collectionName, documentObject) => {
    client
      .db(DB_NAME)
      .collection(collectionName)
      .insertOne(documentObject, function (err, res) {
        if (err) throw err;
        console.log("Created successfully!");
      });
  };

  myDB.isExisting = async (collectionName, filterObject) => {
    try {
      let res = await client
        .db(DB_NAME)
        .collection(collectionName)
        .findOne(filterObject);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  myDB.retrieveAll = (collectionName, filterObject, funcCallback) => {
    client
      .db(DB_NAME)
      .collection(collectionName)
      .find(filterObject)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("Retrieved Successfully!");
        console.log("-------------------------");
        console.log("Retrieved Content:");
        console.log(result);
        console.log("-------------------------");
        funcCallback(result);
      });
  };

  myDB.update = (collectionName, filterObject, updateFieldObject) => {
    client
      .db(DB_NAME)
      .collection(collectionName)
      .updateOne(
        filterObject,
        { $set: updateFieldObject },
        function (err, res) {
          if (err) throw err;
          console.log("Updated Successfully!");
        }
      );
  };

  myDB.delete = (collectionName, filterObject) => {
    client
      .db(DB_NAME)
      .collection(collectionName)
      .deleteOne(filterObject, function (err, obj) {
        if (err) throw err;
        console.log("Deleted Successfully!");
      });
  };

  return myDB;
}

module.exports = myDBBuilder();
