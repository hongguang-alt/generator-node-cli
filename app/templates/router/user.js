const Router = require("koa-router");
const router = Router();
const User = require("../controller/user");


//登陆接口
router.get("/getUserInfo", User.getUserInfo);

module.exports = router;
