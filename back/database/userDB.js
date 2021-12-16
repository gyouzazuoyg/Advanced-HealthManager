const myDB = require("./myDB");

function userDBBuilder() {
  const userDB = {};
  const COLLECTION_NAME = "users";

  userDB.create = (userName, password) => {
    const DOCUMENT = {
      userName: userName,
      password: password,
    };
    const FILTER = { userName: userName };
    myDB.isExisting(COLLECTION_NAME, FILTER).then((flag) => {
      if (flag) {
        myDB.update(COLLECTION_NAME, FILTER, DOCUMENT);
        console.log("Existing. Updated!");
      } else {
        myDB.create(COLLECTION_NAME, DOCUMENT);
        console.log("Not Existing. Created!");
      }
    });
  };

  userDB.delete = (userName) => {
    const FILTER = {
      userName: userName,
    };
    myDB.isExisting(COLLECTION_NAME, FILTER).then((flag) => {
      if (flag) {
        myDB.delete(COLLECTION_NAME, FILTER);
        console.log("Food Deleted Successfully!");
      } else {
        console.log("Delete failed. The food is not existing!");
      }
    });
  };

  userDB.login = async (userName, funcCallback) => {
    const FILTER = {
      userName: userName,
    };
    return myDB.retrieveAll(COLLECTION_NAME, FILTER, funcCallback);
  };

  return userDB;
}

module.exports = userDBBuilder();
