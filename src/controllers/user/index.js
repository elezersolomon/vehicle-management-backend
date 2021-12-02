const { makeUserEntity } = require("./userEntity");
const { makeUserBusinessLogic } = require("./userLogic");
const { makeUserStore } = require("./userStore");

const makeUserController = ({ db, helper }) => {
  const store = makeUserStore({ db, helper });
  const entity = makeUserEntity({ helper });
  const businessLogic = makeUserBusinessLogic({ store, entity, helper });
  return businessLogic;
};

module.exports = { makeUserController };
