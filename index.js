require('dotenv').config
const Koa = require("koa");
const koa_parser = require("koa-bodyparser");
const koa_cors = require("@koa/cors");

const router = require("./router");
const app = new Koa();
const port = process.env.PORT || 8000;

app.use(koa_parser())
.use(koa_cors())
.use(router.routes());

app.listen(port, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});
