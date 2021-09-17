const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const koaJwt = require("koa-jwt");
const routing = require("./router");

const router = Router({
  prefix: "/api",
});

//解决跨域问题
app.use(cors());

//获取post的参数，以及可以上传文件
app.use(
  koaBody({
    multipart: true,
  })
);

//控制权限
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        msg: "你没有权限",
        status: "201",
      };
    } else {
      throw err;
    }
  });
});

//对权限做验证
app.use(
  koaJwt({
    secret: "secret",
  }).unless({
    path: [/^\/api\/user\/getUserInfo/],
  })
);

//配置路由
routing(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
