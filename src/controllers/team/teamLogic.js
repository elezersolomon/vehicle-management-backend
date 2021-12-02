const makeTeamBusinessLogic = ({ store, entity, helper }) => {
  const { storeTeam, findTeamFromStore, FindTeamByIdFromStore } = store;
  const { validateTeamCreation } = entity;

  const createTeam = ({ data, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var creator = isAuthorized.user;

    var teamEntity = validateTeamCreation({ data, creator });
    var teamData = storeTeam({ team: teamEntity });
    return teamData;
  };

  const findTeams = ({ data, query, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var teams = findTeamFromStore({ query });
    return teams;
  };

  const findTeamById = ({ data, parameter, isAuthorized }) => {
   if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var team = FindTeamByIdFromStore({ id: parameter.id });
    return team;
  };

  return { createTeam, findTeams, findTeamById };
};

module.exports = { makeTeamBusinessLogic };
