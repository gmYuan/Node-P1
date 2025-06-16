const program = require('commander');
const api = require('./index.js');

program
    .option('-x, --xxx', '我是一个x测试option')


program.command('add')
    .description('add a new task')
    .action((...args) => {
      // console.dir('this is add command', args[args.length - 1]);
      const words = args.slice(0, -1).join(' ');
      api.add(words)
    });

program.command('clear')
    .description('clear all tasks')
    .action(() => {
      console.log('this is clear command');
    });

program.parse(process.argv);