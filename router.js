const Router = require("koa-router");

const router = new Router();

router.get("", (ctx) => ctx.body("home route"));

module.exports = router;