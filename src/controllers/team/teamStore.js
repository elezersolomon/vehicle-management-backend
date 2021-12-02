const makeTeamStore = ({ db, helper }) => {
  const storeTeam = async ({ team }) => {
    var data = await db.save(team);
    var teamData = { id: data.id, ...team };
    return teamData;
  };
  const findTeamFromStore = async ({ query }) => {
    var teams = await db.find({ type: "team", ...query });

    var teamList = [];
    for (var i = 0; i < teams.length; i++) {
      var team = { id: teams[i]._id, ...teams[i] };
      delete team._id;
      delete team._rev;
      teamList.push(team);
    }
    return teamList;
  };
  
  const FindTeamByIdFromStore = async ({ id }) => {
    var team = await findItemById({ id, type: "team" });
    team = { id: team._id, ...team };
    delete team._id;
    delete team._rev;
    return team;
  };

  const findItemById = async ({ id, type }) => {
    var data = await db.find({ type, _id: id });
    if (data.length == 0) {
      throw new Error("Invalid id");
    }
    return data[0];
  };
  return { storeTeam, findTeamFromStore, FindTeamByIdFromStore };
};

module.exports = { makeTeamStore };
