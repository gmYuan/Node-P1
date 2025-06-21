#! /usr/bin/env node

const program = require("commander");
const api = require("./index.js");
const pkg = require("./package.json");

program.version(pkg.version);

// 无任何参数时，输出帮助信息
if (process.argv.length === 2) {
  void api.showAll();
}

program
  .command("add")
  .description("add a new task")
  .action((...args) => {
    // console.dir('this is add command', args[args.length - 1]);
    const words = args.slice(0, -1).join(" ");
    api
      .add(words)
      .then(() => {
        console.log("添加成功");
      })
      .catch((err) => {
        console.log("添加失败", err);
      });
  });

program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    api
      .clear()
      .then(() => {
        console.log("清除成功");
      })
      .catch((err) => {
        console.log("清除失败", err);
      });
  });

program.parse(process.argv);
