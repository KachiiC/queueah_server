// ENV
require("dotenv").config();
// KOA IMPORTS
const Koa = require("koa");
const Parser = require("koa-bodyparser");
const Cors = require("@koa/cors");
const Morgan = require('koa-morgan');
const Router = require("./router").routes();
// APP VARIABLES
const App = new Koa();
const Port = process.env.PORT || 8000;
const CallBack = () => console.log(`🚀 Server listening http://127.0.0.1:${Port}/ 🚀`)

App.use(Parser())
  .use(Cors())
  .use(Morgan('short'))
  .use(Router)
  .listen(Port, CallBack);