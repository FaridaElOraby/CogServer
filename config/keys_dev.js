module.exports = {
  mongoURI:
    "mongodb://dbUser:1234@cluster0-shard-00-00.sxbfs.mongodb.net:27017,cluster0-shard-00-01.sxbfs.mongodb.net:27017,cluster0-shard-00-02.sxbfs.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-v4uk1u-shard-0&authSource=admin&retryWrites=true&w=majority",
  salt: parseInt(10),
  signingKey: "acl-project",
};
