const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },

  e2e: {
    // 方法一：只运行指定目录的测试（推荐）
    // 只运行 my-tests 目录下的测试文件
    specPattern: "cypress/e2e/my-tests/**/*.cy.{js,jsx,ts,tsx}",

    // 方法二：排除特定目录（备选）
    // excludeSpecPattern: [
    //   "cypress/e2e/1-getting-started/**/*",
    //   "cypress/e2e/2-advanced-examples/**/*"
    // ],

    // 方法三：更灵活的模式匹配
    // specPattern: [
    //   "cypress/e2e/my-tests/**/*.cy.{js,jsx,ts,tsx}",
    //   "cypress/e2e/custom-tests/**/*.cy.{js,jsx,ts,tsx}",
    //   "!cypress/e2e/1-getting-started/**/*",
    //   "!cypress/e2e/2-advanced-examples/**/*"
    // ],

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
