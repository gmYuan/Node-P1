import * as commander from "commander";

const program = new commander.Command();

program.version("0.0.1")
  .name("fy")
  .description("A CLI tool for fanyi")
  .usage("<english>")

program.parse(process.argv);