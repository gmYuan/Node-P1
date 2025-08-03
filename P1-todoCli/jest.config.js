module.exports = {
  // 测试环境
  testEnvironment: 'node',
  
  // 测试文件匹配模式
  testMatch: [
    '**/__tests__/**/*.spec.js',
    '**/__tests__/**/*.test.js'
  ],
  
  // 覆盖率收集
  collectCoverage: true,
  coverageDirectory: 'coverage',
  
  // 清除mock状态
  clearMocks: true,
  
  // 设置超时时间
  testTimeout: 5000,
  
  // 详细输出
  verbose: true,
}; 