const express = require("express");
const cors = require("cors");

const makeServer = ({ helper }) => {
  const app = express();
  const router = express.Router();
  app.use(express.json());
  app.use(cors());
  app.use("/api", router);

  const port = helper.env.api.port;
  app.listen(port, console.log(`Server running on port ${port}`));
  return { app, router };
};

module.exports = { makeServer };
