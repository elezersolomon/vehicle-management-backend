require("dotenv").config();

const env = require("./environment");
const error = require("./error");
const { makeCustomFunctions } = require("./customMethods");
const { makeValidationRules } = require("./validation");

const initialData = require("./initialData")

const makeHelper = () => {
  const customFunctions = makeCustomFunctions({env});
  const validators = makeValidationRules({});
 
  return {
    env,
    error,
    customFunctions,
    validators,
    initialData, 
    
  };
};

module.exports = { makeHelper };
