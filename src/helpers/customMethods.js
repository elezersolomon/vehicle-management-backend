const uuid = require("uuid");
const shortId = require("short-id")
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const filterObject = require("filter-object-array");
const emoji = require("node-emoji");

const env = require("./environment");

const makeCustomFunctions = ({ env }) => {
  const makeId = () => {
    return uuid.v4();
  };

  const makeShortId = () => {
    return shortId.generate()
  }

  const createFolder = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  };
  const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  };

  const comparePassword = (plainTextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainTextPassword, hashedPassword, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  const generateToken = (data, expTime) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data },
        env.api.secret,
        { expiresIn: expTime },
        (err, token) => {
          resolve(`Bearer ${token}`);
        }
      );
    });
  };

  const verifyToken = (token) => {};

  const getUserDataFromToken = (token) => {
    var tokenValue = token.split(" ")[1];
    if (!tokenValue) {
      throw new Error("Invalid token");
    }
    var userData = jwt.decode(tokenValue);

    if (userData == null) {
      throw new Error("Unauthorized");
    }
    return userData.data;
  };

  const checkAuthorization = async (bearerToken) => {
    var data = { status: false, user: {} };
    if (!bearerToken) return data;

    var token = bearerToken.split(" ")[1];
    if (!token) return data;

    return new Promise((resolve, reject) => {
      jwt.verify(token, env.api.secret, (err, authData) => {
        if (err) {
          resolve(data);
        } else {
          data.status = true;
          data.user = authData.data;
          resolve(data);
        }
      });
    });
  };

  const currentDate = () => {
    var now = Date.now();
    var date = new Date(now);
    return {
      timestamp: now,
      stringDate: `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`,
      isoStringDate: new Date(date).toISOString(),
    };
  };

  const isArray = (field) => {
    const result = Array.isArray(field);
    if (!result) return false;
    return true;
  };

  //filer methods

  const filterJsonObject = async (data, filter) => {
    var filteredData = await filterObject({ array: data, objFilter: filter });
    return filteredData;
  };

  const checkFilterValue = async (data, filter) => {
    var filteredData = await filterObject({
      array: data,
      objFilter: filter,
    });

    if (filteredData.length > 0) return true;
    return false;
  };

  const getEmoji = (emojiName) => {
    return emoji.find(emojiName);
  };

  return {
    getEmoji,
    makeId,
    makeShortId,
    createFolder,
    hashPassword,
    verifyToken,
    checkAuthorization,
    comparePassword,
    generateToken,
    getUserDataFromToken,
    currentDate,
    filterJsonObject,
    checkFilterValue,
    isArray
  };
};

module.exports = { makeCustomFunctions };


