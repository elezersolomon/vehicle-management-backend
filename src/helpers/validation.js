const makeValidationRules = () => {
  const checkEmpty = (field) => {
    if (field == "") return true;
    return false;
  };

  const checkEmptyAndUndefined = (field) => {
    if (field == "" || field == undefined) return true;
    return false;
  };

  const isNumber = (field) => {
    return Number.isInteger(field);
  };

  //check if item is an array and if it is then check its length
  const isArray = (field) => {
    const result = Array.isArray(field);
    if (!result) return false;
    return true;
  };

  const checkUndefined = (field) => {
    if (field == undefined) {
      return true;
    }

    return false;
  };

  const checkDateFormat = () => {};

  return {
    checkEmpty,
    checkUndefined,
    isArray,
    checkEmptyAndUndefined,
    checkDateFormat,
    isNumber,
  };
};

module.exports = { makeValidationRules };
