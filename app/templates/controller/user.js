class User {
  async getUserInfo(ctx) {
    ctx.body = {
      name: "姓名",
      age: "年龄",
    };
  }
}

module.exports = new User();
