const makeDbQuery = ({ db }) => {
  const save = async (doc) => {
    var data = await db.post(doc);
    return data;
  };

  const find = async (query) => {
    var data = await db.find({ selector: query });
    return data.docs;
  };

  const findById = async (id) => {
    var data = await db.get(id);
    return data;
  };

  const update = async (doc) => {
    var data = await db.put(doc);
    return data;
  };

  const bulkUpdate = async (doc) => {
    var data = await db.bulkDocs(doc);
    return data;
  };

  const remove = (doc) => {};

  return { save, find, findById, update, bulkUpdate, remove };
};
module.exports = { makeDbQuery };
