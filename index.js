// ENV
require("dotenv").config();
// KOA IMPORTS
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");
const morgan = require('koa-morgan');
const router = require("./router").routes();
// APP VARIABLES
const App = new Koa();
const Port = process.env.PORT || 8000;

App.use(bodyparser())
  .use(cors())
  .use(morgan('short'))
  .use(router)
  .listen(Port, () => console.log(`🚀 Server listening http://127.0.0.1:${Port}/ 🚀`));