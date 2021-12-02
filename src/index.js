const { makeController } = require("./controllers");
const { makeDb } = require("./db");
const { makeHelper } = require("./helpers");
const { makeServer } = require("./server");
const { makeApi } = require("./api");
const { initialize } = require("./initialize");

const helper = makeHelper();
const server = makeServer({ helper });
const db = makeDb({ helper });
const controller = makeController({ db, helper });
const api = makeApi({ router: server.router, controller, helper });

const initializeProject = initialize({ helper, makeDb, controller });
