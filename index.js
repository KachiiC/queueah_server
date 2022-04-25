// ENV
require("dotenv").config();
// KOA IMPORTS
const Koa = require("koa");
const koa_bodyparser = require("koa-bodyparser");
const koa_cors = require("@koa/cors");
// APP VARIABLES
const app = new Koa();
const port = process.env.PORT || 8000;
const router = require("./router");

app.use(koa_bodyparser())
.use(koa_cors())
.use(router.routes());

app.listen(port, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});