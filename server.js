const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

// create our express app
const app = express();
const graphQLHTTP = require("express-graphql");

const models = require("./models");
// console.log("models", models);

// set our static directory for css, images, and other static content
app.use(express.static("public"));
// parse the body for params etc...// all routes
app.use(bodyParser.json());
// or...
// can create separate parsers (middleware) for json and post params
// for routes sending json objects...
// const jsonParser = bodyParser.json();

// allow cross origin requests by adding following middleware
app.use((req, res, next) => {
  // Allow every client to send requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allowing only POST, GET & OPTIONS requests
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  // Allowing only 'Content-Type' & 'Authorization' Headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Token, X-Refresh-Token"
  );
  // When request method is OPTIONS
  // Don't allow request to reach our GraphQL API's
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// for routes submitting post params
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

// importing DataLoaders
const loaders = require("./graphql/loaders");
const schema = require("./graphql/schema");

app.use(
  "/graphql",
  graphQLHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      models,
      loaders
    }
  }))
);
app.get("/**", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

// app.post("/api/user", async (req, res) => {
//   if (req.body) {
//     const result = await models.User.create(req.body);
//     return res.send(result).status(201);
//   }
// });
// app.get("/", (req, res) => {
//   return res.send("index page").status(200);
// });

app.get("*", async (req, res) => {
  res.send("404 error").status(404);
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Example app is running → PORT ", process.env.PORT || 5000);
});
server.timeout = 3000;
