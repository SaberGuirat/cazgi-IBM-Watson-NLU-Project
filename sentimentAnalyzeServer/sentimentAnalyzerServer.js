const express = require("express");
const dotenv = require("dotenv");
const app = new express();
dotenv.config();

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
  const { IamAuthenticator } = require("ibm-watson/auth");

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });

  return naturalLanguageUnderstanding;
}

app.use(express.static("client"));

const cors_app = require("cors");
app.use(cors_app());

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      keywords: {
        emotion: true,
        limit: 1,
      },
    },
  };
  const nlu = getNLUInstance();
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      res.send(analysisResults.result.keywords);
    })
    .catch((err) => {
      res.send(err.toString());
    });
});

app.get("/url/sentiment", (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      keywords: {
        sentiment: true,
        limit: 1,
      },
    },
  };

  const nlu = getNLUInstance();
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      res.send(analysisResults.result.keywords[0].sentiment.label);
    })
    .catch((err) => {
      res.send(err.toString());
    });
});

app.get("/text/emotion", (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      keywords: {
        emotion: true,
        limit: 1,
      },
    },
  };
  const nlu = getNLUInstance();
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      res.send(analysisResults.result.keywords);
    })
    .catch((err) => {
      res.send(err.toString());
    });
});

app.get("/text/sentiment", (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      keywords: {
        sentiment: true,
        limit: 1,
      },
    },
  };
  const nlu = getNLUInstance();
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      res.send(analysisResults.result.keywords[0].sentiment.label);
    })
    .catch((err) => {
      res.send(err.toString());
    });
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
