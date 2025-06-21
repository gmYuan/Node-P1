const db = require("./db");
const inquirer = require("inquirer");

module.exports.add = async (title) => {
	// 读取之前的任务，从而追加/新增 任务
	const list = await db.read();
	// 追加任务
	list.push({title, done: false});
	// 保存任务
	await db.write(list);
};

module.exports.clear = async () => {
	await db.write([]);
};

module.exports.showAll = async () => {
	// 读取之前的任务
	const list = await db.read();
	// 打印任务列表
	printTasks(list);
};

function printTasks(list) {
	inquirer.prompt([
		{
			type: "list",
			name: "index",
			message: "请选择你要操作的任务",
			choices: [
				{ name: "退出", value: "-1" },
				...list.map((item, idx) => {
					return {
						name: `${item.done ? "[✅]" : "[_]"} ${idx + 1}- ${item.title}`,
						value: `${idx}`, // 注意：value 必须是字符串
					};
				}),
				{ name: "+ 新建任务", value: "-2" },
			],
		},
	])
	.then(async (answer) => {
		const index = Number(answer.index);
		if (index >= 0) {
			// 对当前任务进行操作
			askForAction(list, index);
		} else if (index === -2) {
			// 新增任务
			askForCreateTask(list);
		}
	})
}

function askForAction(list, index) {
	inquirer.prompt([
		{
			type: "list",
			name: "action",
			message: "请选择操作",
			choices: [
				{ name: "退出", value: "quit" },
				{ name: "✅ 标记为已完成", value: "markDone" },
				{ name: "❌ 标记为未完成", value: "markUndone" },
				{ name: "✏️ 编辑任务标题", value: "editTitle" },
				{ name: "🗑️ 删除任务", value: "remove" },
			],
		},
	])
	.then(async (answer2) => {
		const action = answer2.action;
		const target = list[index];
		if (action === "markDone") {
			// 标记为已完成
			target.done = true;
			await db.write(list);
		} else if (action === "markUndone") {
			// 标记为未完成
			target.done = false;
			await db.write(list);
		} else if (action === "editTitle") {
			// 编辑任务标题
      askForEditTitle(list, target)
		} else if (action === "remove") {
			// 删除任务
			list.splice(index, 1);
			await db.write(list);
		}
	});
}

function askForEditTitle(list, task) {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "请输入新的任务标题",
      default: task.title, // 初始化时，默认显示任务的标题
    },
  ])
  .then(async (answer3) => {
    task.title = answer3.title;
    await db.write(list);
  });
}

function askForCreateTask(list) {
	inquirer.prompt([
		{
			type: "input",
			name: "title",
			message: "请输入任务标题",
		},
	])
	.then(async (answer) => {
		list.push({title: answer.title, done: false});
		await db.write(list);
	});
}