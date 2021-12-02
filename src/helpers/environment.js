module.exports = {
  api: {
    port: process.env.PORT,
    secret: process.env.SECRET,
    initialAdminPassword: process.env.ADMIN_USER_PASSWORD,
  },
  db: {
    remoteDb: process.env.REMOTE_DB,
  },
};
