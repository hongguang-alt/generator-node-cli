var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: true });
  }
  // 写入文件
  writeFile() {
    // 写入app主文件
    this.fs.copyTpl(
      this.templatePath("app.js"),
      this.destinationPath(`app.js`)
    );
    this.fs.copyTpl(
      this.templatePath("router/index.js"),
      this.destinationPath(`router/index.js`)
    );
    this.fs.copyTpl(
      this.templatePath("router/user.js"),
      this.destinationPath(`router/user.js`)
    );
    this.fs.copyTpl(
      this.templatePath("controller/user.js"),
      this.destinationPath(`controller/user.js`)
    );
  }
  // 写入包
  writing() {
    const pkgJson = {
      name: this.options.appname,
      version: "1.0.0",
      description: "",
      main: "index.js",
      devDependencies: {},
      dependencies: {
        koa: "^2.13.1",
        "koa-router": "^10.1.1",
        "koa-body": "^4.2.0",
        "koa2-cors": "^2.0.6",
        "koa-jwt": "^4.0.0",
      },
    };
    this.fs.extendJSON(this.destinationPath(`package.json`), pkgJson);
  }
  install(args) {
    this.log(`项目${args}初始化成功`);
  }
};
