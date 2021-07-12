const express = require("express");
const cors = require("cors");
const allRoutes = require("express-list-endpoints");
const { connectDB } = require("./config/dbConfig");
const user = require("./api/routers/user.router");
const simpleDetection = require("./api/routers/simpleDetection.router");
const reyAuditory = require("./api/routers/reyAuditory.router");
const patternMeta = require("./api/routers/patternMeta.router");
const patternEvaluation = require("./api/routers/patternEvaluation.router");
const patternAnswer = require("./api/routers/patternAnswer.router");
const log = require("./api/routers/log.router");
const lexical = require("./api/routers/lexical.router");
const infoSampling = require("./api/routers/infoSampling.router");
const admin = require("./api/routers/admin.router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const explore = (req, res) => {
  const routes = allRoutes(app);
  const result = {
    ServiceList: [],
  };

  routes.forEach((route) => {
    const name = route.path.split("/")[5];
    result.ServiceList.push({
      Service: {
        name,
        fullUrl: `${route.path}`,
      },
    });
  });
  return res.json({ result, count: result.ServiceList.length });
};
app.use("/explore", explore);
app.use("/simpleDetection", simpleDetection);
app.use("/user", user);
app.use("/reyAuditory", reyAuditory);
app.use("/patternMeta", patternMeta);
app.use("/patternEvaluation", patternEvaluation);
app.use("/patternAnswer", patternAnswer);
app.use("/log", log);
app.use("/lexical", lexical);
app.use("/infoSampling", infoSampling);
app.use("/admin", admin);

app.use((req, res) => {
  res.status(404).send({ err: "No such url" });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept"
  );
  next();
});
connectDB();

const port = 5000;
if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log(`Server up and running on ${process.env.PORT}`)
  );
} else {
  app.listen(port, () => console.log(`Server up and running on ${port}`));
}
