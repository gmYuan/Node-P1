const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("dt2", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "user",
  }
);

// S1- 创建1条记录
// sequelize.sync().then(() => {
//   // 创建一条记录
//   User.create({
//     username: "YCC",
//     birthday: new Date(2000, 6, 20),
//   }).then((user) => {
//     console.log(user.toJSON());
//   });
// });

// S2- 查询1条记录
queryAll();

async function queryAll() {
  const users = await User.findAll();
  console.log("-------users---------", JSON.stringify(users));
  sequelize.close();
}
