const { makeTeamEntity } = require("./teamEntity");
const { makeTeamBusinessLogic } = require("./teamLogic");
const { makeTeamStore } = require("./teamStore");

const makeTeamController = ({ db, helper }) => {
  const store = makeTeamStore({db, helper}); 
  const entity = makeTeamEntity({helper})
  const businessLogic = makeTeamBusinessLogic({store, entity, helper})
  return businessLogic
};

module.exports = { makeTeamController };
