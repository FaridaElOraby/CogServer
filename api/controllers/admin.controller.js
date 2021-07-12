const usermodel = require("../../models/user.model");
const infoSamplingmodel = require("../../models/infoSampling.model");
const lexicalmodel = require("../../models/lexical.model");
const logmodel = require("../../models/log.model");
const patternAnswermodel = require("../../models/patternAnswer.model");
const patternEvaluationmodel = require("../../models/patternEvaluation.model");
const patternMetamodel = require("../../models/patternMeta.model");
const reyAuditorymodel = require("../../models/reyAuditory.model");
const simpleDetectionmodel = require("../../models/simpleDetection.model");

const {
  success,
  entityNotFound,
  unknown,
} = require("../constants/statusCodes");

const getValidData = async (req, res) => {
  try {
    ///// all data //////
    const dataList = [];
    ///// all users //////
    const usersFound = await usermodel.find({
      phase: "data collection",
      valid: "true",
      // username: "teeffa",
    });
    ///// no users //////
    if (!usersFound) {
      return res.json({
        statusCode: entityNotFound,
        error: "No Users Found",
      });
    }
    ///// for each user //////

    for (let i = 0; i < usersFound.length; i++) {
      ///// user data //////
      const userData = {};
      ///// demographics //////
      userData.username = usersFound[i].username;
      if (usersFound[i].gender) {
        userData.gender = usersFound[i].gender;
      } else {
        userData.gender = "none";
      }
      if (usersFound[i].educationalLevel) {
        userData.education = usersFound[i].educationalLevel;
      } else {
        userData.education = "none";
      }
      if (usersFound[i].caffiene && usersFound[i].caffiene >= 0) {
        userData.caffiene = parseInt(usersFound[i].caffiene);
      } else {
        userData.caffiene = -1;
      }
      userData.mentalillness = usersFound[i].mentalIllness;
      userData.notes = usersFound[i].notes;
      userData.age = 2021 - parseInt(usersFound[i].birthYear);

      ///// simple detection //////
      const simpleDetectionFound = await simpleDetectionmodel.find({
        username: userData.username,
      });
      for (let j = 0; j < simpleDetectionFound.length; j++) {
        const key = "reactionTime" + simpleDetectionFound[j].round;
        userData[key] = parseFloat(simpleDetectionFound[j].reactionTime);
      }

      for (let k = 0; k < 4; k++) {
        ///// rey auditory //////
        if (k != 2) {
          const reyAuditory = await reyAuditorymodel.find({
            username: userData.username,
            round: k,
          });
          const reyWords = [];
          let key = "";
          for (let j = 0; j < reyAuditory.length; j++) {
            reyWords.push(reyAuditory[j].word);
          }
          if (
            reyWords.includes("fish") ||
            reyWords.includes("fizh") ||
            reyWords.includes("fis") ||
            reyWords.includes("fih") ||
            reyWords.includes("ish") ||
            reyWords.includes("fosh") ||
            reyWords.includes("fsh") ||
            reyWords.includes("fisg") ||
            reyWords.includes("fisj")
          ) {
            key = "fishR" + k;
            userData[key] = 1;
          } else {
            key = "fishR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("coat") ||
            reyWords.includes("goat") ||
            reyWords.includes("oat") ||
            reyWords.includes("cod") ||
            reyWords.includes("coar") ||
            reyWords.includes("caught") ||
            reyWords.includes("salt") ||
            reyWords.includes("code")
          ) {
            key = "coatR" + k;
            userData[key] = 1;
          } else {
            key = "coatR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("milk") ||
            reyWords.includes("mil") ||
            reyWords.includes("mik") ||
            reyWords.includes("miok") ||
            reyWords.includes("mlk") ||
            reyWords.includes("ilk")
          ) {
            key = "milkR" + k;
            userData[key] = 1;
          } else {
            key = "milkR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("pencil") ||
            reyWords.includes("penci") ||
            reyWords.includes("pencl") ||
            reyWords.includes("pensil") ||
            reyWords.includes("pencile") ||
            reyWords.includes("pecil") ||
            reyWords.includes("pncil") ||
            reyWords.includes("penskl")
          ) {
            key = "pencilR" + k;
            userData[key] = 1;
          } else {
            key = "pencilR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("water") ||
            reyWords.includes("watr") ||
            reyWords.includes("wate") ||
            reyWords.includes("butter") ||
            reyWords.includes("watet")
          ) {
            key = "waterR" + k;
            userData[key] = 1;
          } else {
            key = "waterR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("lamp") ||
            reyWords.includes("map") ||
            reyWords.includes("lamo") ||
            reyWords.includes("palm") ||
            reyWords.includes("plant") ||
            reyWords.includes("lamb") ||
            reyWords.includes("lmp")
          ) {
            key = "lampR" + k;
            userData[key] = 1;
          } else {
            key = "lampR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("ball") ||
            reyWords.includes("bowl") ||
            reyWords.includes("bomb") ||
            reyWords.includes("doll") ||
            reyWords.includes("vall")
          ) {
            key = "ballR" + k;
            userData[key] = 1;
          } else {
            key = "ballR" + k;
            userData[key] = 0;
          }
          if (
            reyWords.includes("coffee") ||
            reyWords.includes("coffe") ||
            reyWords.includes("cofee") ||
            reyWords.includes("coffie") ||
            reyWords.includes("cofe") ||
            reyWords.includes("cofie")
          ) {
            key = "coffeeR" + k;
            userData[key] = 1;
          } else {
            key = "coffeeR" + k;
            userData[key] = 0;
          }
        }
      }

      /// rey B ////
      const reyAuditoryB = await reyAuditorymodel.find({
        username: userData.username,
        round: 2,
      });
      const reyWordsB = [];
      let key = "";
      for (let j = 0; j < reyAuditoryB.length; j++) {
        reyWordsB.push(reyAuditoryB[j].word);
      }
      if (
        reyWordsB.includes("juice") ||
        reyWordsB.includes("jouce") ||
        reyWordsB.includes("jucie") ||
        reyWordsB.includes("cheese") ||
        reyWordsB.includes("juse") ||
        reyWordsB.includes("juic")
      ) {
        key = "juiceR2";
        userData[key] = 1;
      } else {
        key = "juiceR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("mouse") ||
        reyWordsB.includes("maus") ||
        reyWordsB.includes("house") ||
        reyWordsB.includes("muse") ||
        reyWordsB.includes("mause") ||
        reyWordsB.includes("muose")
      ) {
        key = "mouseR2";
        userData[key] = 1;
      } else {
        key = "mouseR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("radio") ||
        reyWordsB.includes("raio") ||
        reyWordsB.includes("rado") ||
        reyWordsB.includes("radi") ||
        reyWordsB.includes("rdio") ||
        reyWordsB.includes("radia")
      ) {
        key = "radioR2";
        userData[key] = 1;
      } else {
        key = "radioR2";
        userData[key] = 0;
      }
      if (reyWordsB.includes("can") || reyWordsB.includes("cam")) {
        key = "canR2";
        userData[key] = 1;
      } else {
        key = "canR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("cat") ||
        reyWordsB.includes("hat") ||
        reyWordsB.includes("car")
      ) {
        key = "catR2";
        userData[key] = 1;
      } else {
        key = "catR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("apple") ||
        reyWordsB.includes("apl") ||
        reyWordsB.includes("appel") ||
        reyWordsB.includes("aple") ||
        reyWordsB.includes("appl")
      ) {
        key = "appleR2";
        userData[key] = 1;
      } else {
        key = "appleR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("chair") ||
        reyWordsB.includes("chiar") ||
        reyWordsB.includes("cahir") ||
        reyWordsB.includes("chare")
      ) {
        key = "chairR2";
        userData[key] = 1;
      } else {
        key = "chairR2";
        userData[key] = 0;
      }
      if (
        reyWordsB.includes("rope") ||
        reyWordsB.includes("robe") ||
        reyWordsB.includes("coke") ||
        reyWordsB.includes("rose") ||
        reyWordsB.includes("rod") ||
        reyWordsB.includes("rop") ||
        reyWordsB.includes("rob")
      ) {
        key = "ropeR2";
        userData[key] = 1;
      } else {
        key = "ropeR2";
        userData[key] = 0;
      }
      const reyMetaData = await logmodel.findOne({
        username: userData.username,
        scene: "rey",
      });
      if (reyMetaData) userData.reyMeta = parseInt(reyMetaData.action);
      const patternAnswer = await patternAnswermodel.findOne({
        username: userData.username,
      });
      const patternEvaluation = await patternEvaluationmodel.find({
        username: userData.username,
      });
      let patternCorrectCount = 0;
      for (let l = 0; l < patternEvaluation.length; l++) {
        if (patternEvaluation[l].evaluation === "correct") {
          patternCorrectCount += 1;
        }
        let roundNumber =
          parseInt(patternEvaluation[l].round) +
          Math.floor(parseInt(patternEvaluation[l].chosenPattern) / 8) * 4;
        key = "patternR" + roundNumber;
        if (parseInt(patternEvaluation[l].chosenPattern) % 2 === 0) {
          userData[key] = 1;
        } else {
          userData[key] = 2;
        }
        key = "patternA" + roundNumber;
        userData[key] = parseInt(patternAnswer.modelAnswer[roundNumber]);
        key = "patternTimeTaken" + roundNumber;
        userData[key] = parseFloat(patternEvaluation[l].timePassed);
      }
      userData.patternScore = patternCorrectCount;
      const patternMeta = await patternMetamodel.findOne({
        username: userData.username,
      });
      if (parseInt(patternMeta.metaAnswer) <= 10) {
        userData.patternMeta = parseInt(patternMeta.metaAnswer);
      } else {
        userData.patternMeta = 10;
      }
      const infoSampling = await infoSamplingmodel.find({
        username: userData.username,
      });

      for (let n = 0; n < infoSampling.length; n++) {
        let roundNumber = infoSampling[n].round;

        key = "openBagsR" + roundNumber;
        userData[key] = parseInt(infoSampling[n].openBags);
        key = "openClothesR" + roundNumber;
        userData[key] = parseInt(infoSampling[n].openClothes);
        key = "userAnswerR" + roundNumber;
        userData[key] = infoSampling[n].userAnswer;
        key = "correctAnswerR" + roundNumber;
        userData[key] = infoSampling[n].correctAnswer;
        key = "timeTakenInfoR" + roundNumber;
        userData[key] = parseFloat(infoSampling[n].timePassed);

        if (parseInt(roundNumber) !== 2) {
          let logtype = "confidence out of 10 for round " + roundNumber;
          const infoSamplingMeta = await logmodel.findOne({
            username: userData.username,
            type: logtype,
          });
          if (infoSamplingMeta) {
            key = "infoSamplingMetaR" + roundNumber;
            userData[key] = parseInt(infoSamplingMeta.action);
          }
        }
      }
      const lexical = await lexicalmodel.find({
        username: userData.username,
      });
      const clickedWords = [];
      for (let o = 0; o < lexical.length; o++) {
        clickedWords.push(lexical[o].word);
      }
      if (lexical) {
        var correctClick = 0;
        var wrongClick = 1;
        var matching = 0;
        var nonword = 1;
        var nonmatching = 0;
        if (clickedWords.includes("Needle")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Slisped")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Weff")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Vames")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Loaf")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Bread")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Sploons")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rharved")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Glue")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Breap")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Blaze")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Fire")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Glove")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Hand")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Stroobs")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Prilns")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Buy")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Cash")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Novel")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Gnuce")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Thwurge")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rabbit")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Days")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Sun")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Reuth")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Scems")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Washer")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Dryer")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Lady")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Red")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Tweigh")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Paper")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Rerns")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Flonds")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Carrot")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Horse")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }

        userData.correctClick = correctClick;
        userData.wrongClick = wrongClick;
        userData.matching = matching;
        userData.nonmatching = nonmatching;
        userData.nonword = nonword;

        if (correctClick > 1) {
          userData.correctClick = 1;
        }
      }
      const lexicalMeta = await logmodel.findOne({
        username: userData.username,
        scene: "lexical",
      });
      if (lexicalMeta) userData.lexicalMeta = parseInt(lexicalMeta.action);

      dataList.push(userData);
    }

    return res.json({
      dataList: dataList,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

const getPaperData = async (req, res) => {
  try {
    ///// all data //////
    const dataList = [];
    let count = 0;
    const usernameList = [
      "hooda",
      "hehe",
      "reemayman",
      "nourabadawy",
      "ykh",
      "popsieeeee",
      "jerry",
      "marwan99",
      "salma alkhateeb",
      "rahrah",
      "reemsalah1",
    ];
    ///// all users //////
    const usersFound = await usermodel.find({
      username: {
        $in: usernameList,
      },
    });
    ///// no users //////
    if (!usersFound) {
      return res.json({
        statusCode: entityNotFound,
        error: "No Users Found",
      });
    }
    ///// for each user //////

    for (let i = 0; i < usersFound.length; i++) {
      ///// user data //////
      const userData = {};
      ///// demographics //////
      userData.username = usersFound[i].username;
      if (usersFound[i].gender) {
        userData.gender = usersFound[i].gender;
      } else {
        userData.gender = "none";
      }
      if (usersFound[i].educationalLevel) {
        userData.education = usersFound[i].educationalLevel;
      } else {
        userData.education = "none";
      }
      if (usersFound[i].caffiene && usersFound[i].caffiene >= 0) {
        userData.caffiene = usersFound[i].caffiene;
      } else {
        userData.caffiene = -1;
      }
      userData.mentalillness = usersFound[i].mentalIllness;
      userData.notes = usersFound[i].notes;
      userData.age = 2021 - parseInt(usersFound[i].birthYear);

      ///// simple detection //////
      const simpleDetectionFound = await simpleDetectionmodel.find({
        username: userData.username,
      });
      for (let j = 0; j < simpleDetectionFound.length; j++) {
        const key = "reactionTime" + simpleDetectionFound[j].round;
        userData[key] = simpleDetectionFound[j].reactionTime;
      }

      for (let k = 0; k < 4; k++) {
        ///// rey auditory //////
        if (k != 2) {
          const reyAuditory = await reyAuditorymodel.find({
            username: userData.username,
            round: k,
          });
          const reyWords = [];
          let key = "";
          for (let j = 0; j < reyAuditory.length; j++) {
            reyWords.push(reyAuditory[j].word);
          }
          if (
            reyWords.includes("fish") ||
            reyWords.includes("fizh") ||
            reyWords.includes("fis") ||
            reyWords.includes("fih") ||
            reyWords.includes("ish") ||
            reyWords.includes("fosh") ||
            reyWords.includes("fsh") ||
            reyWords.includes("fisg") ||
            reyWords.includes("fisj")
          ) {
            key = "fishR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("coat") ||
            reyWords.includes("goat") ||
            reyWords.includes("oat") ||
            reyWords.includes("cod") ||
            reyWords.includes("coar") ||
            reyWords.includes("caught") ||
            reyWords.includes("salt") ||
            reyWords.includes("code")
          ) {
            key = "coatR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("milk") ||
            reyWords.includes("mil") ||
            reyWords.includes("mik") ||
            reyWords.includes("miok") ||
            reyWords.includes("mlk") ||
            reyWords.includes("ilk")
          ) {
            key = "milkR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("pencil") ||
            reyWords.includes("penci") ||
            reyWords.includes("pencl") ||
            reyWords.includes("pensil") ||
            reyWords.includes("pencile") ||
            reyWords.includes("pecil") ||
            reyWords.includes("pncil") ||
            reyWords.includes("penskl")
          ) {
            key = "pencilR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("water") ||
            reyWords.includes("watr") ||
            reyWords.includes("wate") ||
            reyWords.includes("butter") ||
            reyWords.includes("watet")
          ) {
            key = "waterR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("lamp") ||
            reyWords.includes("map") ||
            reyWords.includes("lamo") ||
            reyWords.includes("palm") ||
            reyWords.includes("plant") ||
            reyWords.includes("lamb") ||
            reyWords.includes("lmp")
          ) {
            key = "lampR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("ball") ||
            reyWords.includes("bowl") ||
            reyWords.includes("bomb") ||
            reyWords.includes("doll") ||
            reyWords.includes("vall")
          ) {
            key = "ballR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("coffee") ||
            reyWords.includes("coffe") ||
            reyWords.includes("cofee") ||
            reyWords.includes("coffie") ||
            reyWords.includes("cofe") ||
            reyWords.includes("cofie")
          ) {
            key = "coffeeR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
        }
      }

      /// rey B ////
      const reyAuditoryB = await reyAuditorymodel.find({
        username: userData.username,
        round: 2,
      });
      const reyWordsB = [];
      let key = "";
      for (let j = 0; j < reyAuditoryB.length; j++) {
        reyWordsB.push(reyAuditoryB[j].word);
      }
      if (
        reyWordsB.includes("juice") ||
        reyWordsB.includes("jouce") ||
        reyWordsB.includes("jucie") ||
        reyWordsB.includes("cheese") ||
        reyWordsB.includes("juse") ||
        reyWordsB.includes("juic")
      ) {
        key = "juiceR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("mouse") ||
        reyWordsB.includes("maus") ||
        reyWordsB.includes("house") ||
        reyWordsB.includes("muse") ||
        reyWordsB.includes("mause") ||
        reyWordsB.includes("muose")
      ) {
        key = "mouseR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("radio") ||
        reyWordsB.includes("raio") ||
        reyWordsB.includes("rado") ||
        reyWordsB.includes("radi") ||
        reyWordsB.includes("rdio") ||
        reyWordsB.includes("radia")
      ) {
        key = "radioR2";
        userData[key] = true;
      }
      if (reyWordsB.includes("can") || reyWordsB.includes("cam")) {
        key = "canR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("cat") ||
        reyWordsB.includes("hat") ||
        reyWordsB.includes("car")
      ) {
        key = "catR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("apple") ||
        reyWordsB.includes("apl") ||
        reyWordsB.includes("appel") ||
        reyWordsB.includes("aple") ||
        reyWordsB.includes("appl")
      ) {
        key = "appleR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("chair") ||
        reyWordsB.includes("chiar") ||
        reyWordsB.includes("cahir") ||
        reyWordsB.includes("chare")
      ) {
        key = "chairR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("rope") ||
        reyWordsB.includes("robe") ||
        reyWordsB.includes("coke") ||
        reyWordsB.includes("rose") ||
        reyWordsB.includes("rod") ||
        reyWordsB.includes("rop") ||
        reyWordsB.includes("rob")
      ) {
        key = "ropeR2";
        userData[key] = true;
      }
      const reyMetaData = await logmodel.findOne({
        username: userData.username,
        scene: "rey",
      });
      if (reyMetaData) userData.reyMeta = reyMetaData.action;
      const patternAnswer = await patternAnswermodel.findOne({
        username: userData.username,
      });
      const patternEvaluation = await patternEvaluationmodel.find({
        username: userData.username,
      });
      let patternCorrectCount = 0;
      for (let l = 0; l < patternEvaluation.length; l++) {
        if (patternEvaluation[l].evaluation === "correct") {
          patternCorrectCount += 1;
        }
        let roundNumber =
          parseInt(patternEvaluation[l].round) +
          Math.floor(parseInt(patternEvaluation[l].chosenPattern) / 8) * 4;
        key = "patternR" + roundNumber;
        if (parseInt(patternEvaluation[l].chosenPattern) % 2 === 0) {
          userData[key] = 1;
        } else {
          userData[key] = 2;
        }
        key = "patternA" + roundNumber;
        userData[key] = patternAnswer.modelAnswer[roundNumber];
        key = "patternTimeTaken" + roundNumber;
        userData[key] = patternEvaluation[l].timePassed;
      }
      userData.patternScore = patternCorrectCount;
      const patternMeta = await patternMetamodel.findOne({
        username: userData.username,
      });
      if (parseInt(patternMeta.metaAnswer) <= 10) {
        userData.patternMeta = patternMeta.metaAnswer;
      } else {
        userData.patternMeta = 10;
      }
      const infoSampling = await infoSamplingmodel.find({
        username: userData.username,
      });

      for (let n = 0; n < infoSampling.length; n++) {
        let roundNumber = infoSampling[n].round;
        if (parseInt(roundNumber) !== 2) {
          let logtype = "confidence out of 10 for round " + roundNumber;
          const infoSamplingMeta = await logmodel.findOne({
            username: userData.username,
            type: logtype,
          });
          key = "openBagsR" + roundNumber;
          userData[key] = infoSampling[n].openBags;
          key = "openClothesR" + roundNumber;
          userData[key] = infoSampling[n].openClothes;
          key = "userAnswerR" + roundNumber;
          userData[key] = infoSampling[n].userAnswer;
          key = "correctAnswerR" + roundNumber;
          userData[key] = infoSampling[n].correctAnswer;
          key = "timeTakenInfoR" + roundNumber;
          if (infoSamplingMeta) {
            userData[key] = infoSampling[n].timePassed;
            key = "infoSamplingMetaR" + roundNumber;
            userData[key] = infoSamplingMeta.action;
          }
        }
      }
      const lexical = await lexicalmodel.find({
        username: userData.username,
      });
      const clickedWords = [];
      for (let o = 0; o < lexical.length; o++) {
        clickedWords.push(lexical[o].word);
      }
      if (lexical) {
        var correctClick = 0;
        var wrongClick = 1;
        var matching = 0;
        var nonword = 1;
        var nonmatching = 0;
        if (clickedWords.includes("Needle")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Slisped")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Weff")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Vames")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Loaf")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Bread")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Sploons")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rharved")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Glue")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Breap")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Blaze")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Fire")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Glove")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Hand")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Stroobs")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Prilns")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Buy")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Cash")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Novel")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Gnuce")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Thwurge")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rabbit")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Days")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Sun")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Reuth")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Scems")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Washer")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Dryer")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Lady")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Red")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Tweigh")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Paper")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Rerns")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Flonds")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Carrot")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Horse")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }

        userData.correctClick = correctClick;
        userData.wrongClick = wrongClick;
        userData.matching = matching;
        userData.nonmatching = nonmatching;
        userData.nonword = nonword;

        if (correctClick > 1) {
          userData.correctClick = 1;
        }
      }
      const lexicalMeta = await logmodel.findOne({
        username: userData.username,
        scene: "lexical",
      });
      if (lexicalMeta) userData.lexicalMeta = lexicalMeta.action;
      if (userData.username === "hooda") {
        userData.total = 28;
        userData.MIS = 13;
        count += 1;
      } else if (userData.username === "hehe") {
        userData.total = 29;
        userData.MIS = 15;
        count += 1;
      } else if (userData.username === "popsieeeee") {
        userData.total = 26;
        userData.MIS = 12;
        count += 1;
      } else if (userData.username === "salma alkhateeb") {
        userData.total = 25;
        userData.MIS = 11;
        count += 1;
      } else if (userData.username === "ykh") {
        userData.total = 27;
        userData.MIS = 15;
        count += 1;
      } else if (userData.username === "reemsalah1") {
        userData.total = 28;
        userData.MIS = 13;
        count += 1;
      } else if (userData.username === "rahrah") {
        userData.total = 22;
        userData.MIS = 10;
        count += 1;
      } else if (userData.username === "marwan99") {
        userData.total = 26;
        userData.MIS = 14;
        count += 1;
      } else if (userData.username === "jerry") {
        userData.total = 23;
        userData.MIS = 10;
        count += 1;
      } else if (userData.username === "reemayman") {
        userData.total = 22;
        userData.MIS = 10;
        count += 1;
      } else if (userData.username === "nourabadawy") {
        userData.total = 24;
        userData.MIS = 12;
        count += 1;
      }

      dataList.push(userData);
    }

    return res.json({
      dataList,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

const getInvalidData = async (req, res) => {
  try {
    ///// all data //////
    const dataList = [];
    ///// all users //////
    const usersFound = await usermodel.find({
      phase: "data collection",
      valid: "false",
      // username: "teeffa",
    });
    ///// no users //////
    if (!usersFound) {
      return res.json({
        statusCode: entityNotFound,
        error: "No Users Found",
      });
    }
    ///// for each user //////

    for (let i = 0; i < usersFound.length; i++) {
      ///// user data //////
      const userData = {};
      ///// demographics //////
      userData.username = usersFound[i].username;
      if (usersFound[i].gender) {
        userData.gender = usersFound[i].gender;
      } else {
        userData.gender = "none";
      }
      if (usersFound[i].educationalLevel) {
        userData.education = usersFound[i].educationalLevel;
      } else {
        userData.education = "none";
      }
      if (usersFound[i].caffiene && usersFound[i].caffiene >= 0) {
        userData.caffiene = usersFound[i].caffiene;
      } else {
        userData.caffiene = -1;
      }
      userData.mentalillness = usersFound[i].mentalIllness;
      userData.notes = usersFound[i].notes;
      userData.age = 2021 - parseInt(usersFound[i].birthYear);

      ///// simple detection //////
      const simpleDetectionFound = await simpleDetectionmodel.find({
        username: userData.username,
      });
      for (let j = 0; j < simpleDetectionFound.length; j++) {
        const key = "reactionTime" + simpleDetectionFound[j].round;
        userData[key] = simpleDetectionFound[j].reactionTime;
      }

      for (let k = 0; k < 4; k++) {
        ///// rey auditory //////
        if (k != 2) {
          const reyAuditory = await reyAuditorymodel.find({
            username: userData.username,
            round: k,
          });
          const reyWords = [];
          let key = "";
          for (let j = 0; j < reyAuditory.length; j++) {
            reyWords.push(reyAuditory[j].word);
          }
          if (
            reyWords.includes("fish") ||
            reyWords.includes("fizh") ||
            reyWords.includes("fis") ||
            reyWords.includes("fih") ||
            reyWords.includes("ish") ||
            reyWords.includes("fosh") ||
            reyWords.includes("fsh") ||
            reyWords.includes("fisg") ||
            reyWords.includes("fisj")
          ) {
            key = "fishR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("coat") ||
            reyWords.includes("goat") ||
            reyWords.includes("oat") ||
            reyWords.includes("cod") ||
            reyWords.includes("coar") ||
            reyWords.includes("caught") ||
            reyWords.includes("salt") ||
            reyWords.includes("code")
          ) {
            key = "coathR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("milk") ||
            reyWords.includes("mil") ||
            reyWords.includes("mik") ||
            reyWords.includes("miok") ||
            reyWords.includes("mlk") ||
            reyWords.includes("ilk")
          ) {
            key = "milkR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("pencil") ||
            reyWords.includes("penci") ||
            reyWords.includes("pencl") ||
            reyWords.includes("pensil") ||
            reyWords.includes("pencile") ||
            reyWords.includes("pecil") ||
            reyWords.includes("pncil") ||
            reyWords.includes("penskl")
          ) {
            key = "pencilR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("water") ||
            reyWords.includes("watr") ||
            reyWords.includes("wate") ||
            reyWords.includes("butter") ||
            reyWords.includes("watet")
          ) {
            key = "waterR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("lamp") ||
            reyWords.includes("map") ||
            reyWords.includes("lamo") ||
            reyWords.includes("palm") ||
            reyWords.includes("plant") ||
            reyWords.includes("lamb") ||
            reyWords.includes("lmp")
          ) {
            key = "lampR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("ball") ||
            reyWords.includes("bowl") ||
            reyWords.includes("bomb") ||
            reyWords.includes("doll") ||
            reyWords.includes("vall")
          ) {
            key = "ballR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
          if (
            reyWords.includes("coffee") ||
            reyWords.includes("coffe") ||
            reyWords.includes("cofee") ||
            reyWords.includes("coffie") ||
            reyWords.includes("cofe") ||
            reyWords.includes("cofie")
          ) {
            key = "coffeeR" + k;
            userData[key] = true;
          } else {
            userData[key] = false;
          }
        }
      }

      /// rey B ////
      const reyAuditoryB = await reyAuditorymodel.find({
        username: userData.username,
        round: 2,
      });
      const reyWordsB = [];
      let key = "";
      for (let j = 0; j < reyAuditoryB.length; j++) {
        reyWordsB.push(reyAuditoryB[j].word);
      }
      if (
        reyWordsB.includes("juice") ||
        reyWordsB.includes("jouce") ||
        reyWordsB.includes("jucie") ||
        reyWordsB.includes("cheese") ||
        reyWordsB.includes("juse") ||
        reyWordsB.includes("juic")
      ) {
        key = "juiceR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("mouse") ||
        reyWordsB.includes("maus") ||
        reyWordsB.includes("house") ||
        reyWordsB.includes("muse") ||
        reyWordsB.includes("mause") ||
        reyWordsB.includes("muose")
      ) {
        key = "mouseR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("radio") ||
        reyWordsB.includes("raio") ||
        reyWordsB.includes("rado") ||
        reyWordsB.includes("radi") ||
        reyWordsB.includes("rdio") ||
        reyWordsB.includes("radia")
      ) {
        key = "radioR2";
        userData[key] = true;
      }
      if (reyWordsB.includes("can") || reyWordsB.includes("cam")) {
        key = "canR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("cat") ||
        reyWordsB.includes("hat") ||
        reyWordsB.includes("car")
      ) {
        key = "catR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("apple") ||
        reyWordsB.includes("apl") ||
        reyWordsB.includes("appel") ||
        reyWordsB.includes("aple") ||
        reyWordsB.includes("appl")
      ) {
        key = "appleR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("chair") ||
        reyWordsB.includes("chiar") ||
        reyWordsB.includes("cahir") ||
        reyWordsB.includes("chare")
      ) {
        key = "chairR2";
        userData[key] = true;
      }
      if (
        reyWordsB.includes("rope") ||
        reyWordsB.includes("robe") ||
        reyWordsB.includes("coke") ||
        reyWordsB.includes("rose") ||
        reyWordsB.includes("rod") ||
        reyWordsB.includes("rop") ||
        reyWordsB.includes("rob")
      ) {
        key = "ropeR2";
        userData[key] = true;
      }
      const reyMetaData = await logmodel.findOne({
        username: userData.username,
        scene: "rey",
      });
      if (reyMetaData) userData.reyMeta = reyMetaData.action;
      const patternAnswer = await patternAnswermodel.findOne({
        username: userData.username,
      });
      if (patternAnswer) {
        const patternEvaluation = await patternEvaluationmodel.find({
          username: userData.username,
        });
        let patternCorrectCount = 0;
        for (let l = 0; l < patternEvaluation.length; l++) {
          if (patternEvaluation[l].evaluation === "correct") {
            patternCorrectCount += 1;
          }
          let roundNumber =
            parseInt(patternEvaluation[l].round) +
            Math.floor(parseInt(patternEvaluation[l].chosenPattern) / 8) * 4;
          key = "patternR" + roundNumber;
          if (parseInt(patternEvaluation[l].chosenPattern) % 2 === 0) {
            userData[key] = 1;
          } else {
            userData[key] = 2;
          }
          key = "patternA" + roundNumber;
          userData[key] = patternAnswer.modelAnswer[roundNumber];
          key = "patternTimeTaken" + roundNumber;
          userData[key] = patternEvaluation[l].timePassed;
        }

        userData.patternScore = patternCorrectCount;
        const patternMeta = await patternMetamodel.findOne({
          username: userData.username,
        });
        if (patternMeta)
          if (parseInt(patternMeta.metaAnswer) <= 10) {
            userData.patternMeta = patternMeta.metaAnswer;
          } else {
            userData.patternMeta = 10;
          }
      }
      const infoSampling = await infoSamplingmodel.find({
        username: userData.username,
      });

      for (let n = 0; n < infoSampling.length; n++) {
        let roundNumber = infoSampling[n].round;
        if (parseInt(roundNumber) !== 2) {
          let logtype = "confidence out of 10 for round " + roundNumber;
          const infoSamplingMeta = await logmodel.findOne({
            username: userData.username,
            type: logtype,
          });
          key = "openBagsR" + roundNumber;
          userData[key] = infoSampling[n].openBags;
          key = "openClothesR" + roundNumber;
          userData[key] = infoSampling[n].openClothes;
          key = "userAnswerR" + roundNumber;
          userData[key] = infoSampling[n].userAnswer;
          key = "correctAnswerR" + roundNumber;
          userData[key] = infoSampling[n].correctAnswer;
          key = "timeTakenInfoR" + roundNumber;
          if (infoSamplingMeta) {
            userData[key] = infoSampling[n].timePassed;
            key = "infoSamplingMetaR" + roundNumber;
            userData[key] = infoSamplingMeta.action;
          }
        }
      }
      const lexical = await lexicalmodel.find({
        username: userData.username,
      });
      const clickedWords = [];
      for (let o = 0; o < lexical.length; o++) {
        clickedWords.push(lexical[o].word);
      }
      if (lexical) {
        var correctClick = 0;
        var wrongClick = 1;
        var matching = 0;
        var nonword = 1;
        var nonmatching = 0;
        if (clickedWords.includes("Needle")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Slisped")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Weff")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Vames")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Loaf")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Bread")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Sploons")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rharved")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Glue")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Breap")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Blaze")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Fire")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Glove")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Hand")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Stroobs")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Prilns")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Buy")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Cash")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Novel")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Gnuce")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Thwurge")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Rabbit")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Days")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Sun")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Reuth")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Scems")) {
          wrongClick -= 1 / 15;
          nonword -= 0.25;
        }
        if (clickedWords.includes("Washer")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Dryer")) {
          correctClick += 1 / 21;
          matching += 0.25;
        }
        if (clickedWords.includes("Lady")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Red")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }
        if (clickedWords.includes("Tweigh")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Paper")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Rerns")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Flonds")) {
          wrongClick -= 1 / 15;
        }
        if (clickedWords.includes("Carrot")) {
          correctClick += 1 / 21;
        }
        if (clickedWords.includes("Horse")) {
          correctClick += 1 / 21;
          nonmatching += 0.25;
        }

        userData.correctClick = correctClick;
        userData.wrongClick = wrongClick;
        userData.matching = matching;
        userData.nonmatching = nonmatching;
        userData.nonword = nonword;

        if (correctClick > 1) {
          userData.correctClick = 1;
        }
      }
      const lexicalMeta = await logmodel.findOne({
        username: userData.username,
        scene: "lexical",
      });
      if (lexicalMeta) userData.lexicalMeta = lexicalMeta.action;

      dataList.push(userData);
    }

    return res.json({
      dataList,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

const getLogs = async (req, res) => {
  try {
    const dataList = [];
    const userFound = await usermodel.find({
      phase: "data collection",
      valid: "true",
    });
    if (!userFound) {
      return res.json({
        statusCode: entityNotFound,
        error: "Username does not exist",
      });
    }
    for (let i = 0; i < userFound.length; i++) {
      const userData = {};
      const logsFound = await logmodel.find({
        username: userFound[i].username,
      });
      userData.username = userFound[i].username;

      for (let j = 0; j < logsFound.length; j++) {
        userData["log" + j + 1] = logsFound[j].action;
      }
      dataList.push(userData);
    }

    return res.json({ count: dataList.length, dataList: dataList });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

module.exports = {
  getValidData,
  getInvalidData,
  getLogs,
  getPaperData,
};
