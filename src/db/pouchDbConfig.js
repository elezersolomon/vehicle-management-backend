const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
PouchDB.plugin(require("pouchdb-authentication"));
const path = require("path");

const makeDbSetup = ({ helper }) => {
  var { customFunctions, env } = helper;
  var { createFolder } = customFunctions;
  var dbPath = path.join(__dirname, "../../localdatabase/");
  createFolder(dbPath);
  var db = new PouchDB(`${dbPath}/speedlimit_database`);
  var remoteDb = new PouchDB(env.db.remoteDb);

  db.sync(remoteDb, { live: true, retry: true })
    .on("change", (change) => {})
    .on("paused", (info) => {})
    .on("active", (info) => {})
    .on("error", (error) => {});
  return db;
};

module.exports = { makeDbSetup };
