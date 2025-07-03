const db = require("../db");
const fs = require("fs");

// Mock fs module
jest.mock("fs");

describe("db", () => {
  beforeEach(() => {
    // 清除所有mock的调用记录
    jest.clearAllMocks();
		// 清除 自定义的mock历史对象数值记录
		fs.clearMocks();
  });

  it("can read", async () => {
    const data = [{ title: "test", done: true }];
    // 使用自定义的 setReadFileMock 方法
    fs.setReadFileMock("/xxx", null, JSON.stringify(data));
    // 测试是否有 读取文件功能：是否调用了fs.readFile方法
    const list = await db.read("/xxx");
    expect(list).toStrictEqual(data);
  });

  it("can write", async () => {
    let fakeFile;
    // 使用自定义的 setWriteFileMock 方法
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: "见欧阳娜娜", done: true },
      { title: "见迪丽热巴", done: true },
    ];
    // 测试是否有 写入文件功能：是否调用了fs.writeFile方法
    await db.write(list, "/yyy");
    expect(fakeFile).toBe(JSON.stringify(list) + "\n");
  });
});
