const _fs = jest.requireActual("fs");

// 创建 mock 对象，继承真实 fs 的所有方法
const fs = {
  ..._fs,
  readFile: jest.fn(),
  writeFile: jest.fn(),
};

// mock 读
let readMocks = {};
fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data];
};

fs.readFile.mockImplementation((path, options, callback) => {
  if (callback === undefined) callback = options;
  if (path in readMocks) {
    callback(...readMocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
});

// mock 写
let writeMocks = {};
fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn;
};
fs.writeFile.mockImplementation((file, data, options, callback) => {
  if (file in writeMocks) {
    writeMocks[file](file, data, options, callback);
  } else {
    _fs.writeFile(file, data, options, callback);
  }
});


// clearMock 方法
fs.clearMocks = () => {
  readMocks = {};
  writeMocks = {};
};

module.exports = fs;
