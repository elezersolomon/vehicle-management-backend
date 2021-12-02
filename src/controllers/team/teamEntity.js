const makeTeamEntity = ({ helper }) => {
  const { error, customFunctions, validators } = helper;
  const { currentDate } = customFunctions;

  const validateTeamCreation = ({ data, creator }) => {
    var { name } = data;
    if (name == undefined || name == "") {
      throw new Error("Team name is required");
    }

    return {
      type: "team",
      name: name.toString().trim(),
      createdBy: {
        id: creator.id,
        fullName: creator.fullName,
      },
      createdDate: {
        timeStamp: currentDate().timestamp,
        isoStringDate: currentDate().isoStringDate,
        stringDate: currentDate().stringDate,
      },
    };
  };

  return { validateTeamCreation };
};

module.exports = { makeTeamEntity };
