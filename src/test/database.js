const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const path = require("path");
const helper = require("../helpers")

const makeDbSetup = ({ helper }) => {
  var { customFunctions } = helper;
  var { createFolder } = customFunctions;
  var dbPath = path.join(__dirname, "../../localDatabase/");
  createFolder(dbPath);
  var db = new PouchDB(`${dbPath}/test_database`);
  return db;
};

const makeDbQuery = ({ db }) => {
  const save = async (doc) => {
    var data = await db.post(doc);
    return data;
  };

  const find = async (query) => {
    var data = await db.find({ selector: query });
    return data.docs;
  };

  const findById = async (id) => {
    var data = await db.get(id);
    return data;
  };

  const update = async (doc) => {
    var data = await db.put(doc);
    return data;
  };

  const remove = (doc) => {};

  return { save, find, findById, update, remove };
};

const makeTestDb = ({helper}) => {
  const db = makeDbSetup({helper});
  const query = makeDbQuery({ db });
  return query;
};

module.exports = {makeTestDb}