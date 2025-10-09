/// <reference types="cypress" />

// 网站功能测试示例
// 演示如何测试不同类型的Web功能

describe('网站功能测试', () => {
  
  // 测试不同的网站
  describe('搜索引擎测试', () => {
    it('应该能够访问百度首页', () => {
      cy.visit('https://www.baidu.com')
      
      // 验证搜索框存在
      cy.get('#kw').should('be.visible')
      
      // 验证搜索按钮存在
      cy.get('#su').should('be.visible')
      
      // 输入搜索关键词
      cy.get('#kw').type('Cypress测试框架')
      
      // 点击搜索（注意：这里只是演示，实际测试时要注意网站的反爬虫机制）
      // cy.get('#su').click()
    })
  })

  describe('表单测试示例', () => {
    beforeEach(() => {
      // 使用Cypress示例页面
      cy.visit('https://example.cypress.io/commands/actions')
    })

    it('应该能够填写和提交表单', () => {
      // 测试文本输入
      cy.get('.action-email')
        .type('test@example.com')
        .should('have.value', 'test@example.com')

      // 测试下拉选择
      cy.get('.action-select')
        .select('apples')
        .should('have.value', 'apples')

      // 测试多选
      cy.get('.action-multiple-select')
        .select(['apples', 'oranges'])

      // 测试checkbox
      cy.get('.action-checkboxes [type="checkbox"]')
        .not('[disabled]')
        .check()
        .should('be.checked')

      // 测试radio button
      cy.get('.action-radios [type="radio"]')
        .not('[disabled]')
        .check()
        .should('be.checked')
    })

    it('应该能够处理文件上传', () => {
      // 注意：文件上传需要特殊处理
      cy.get('.action-file').selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'test.txt',
        mimeType: 'text/plain'
      })
    })
  })

  describe('网络请求测试', () => {
    it('应该能够拦截和验证API请求', () => {
      // 设置网络请求拦截
      cy.intercept('GET', '**/comments/*', { fixture: 'example.json' }).as('getComment')

      cy.visit('https://example.cypress.io/commands/network-requests')
      
      // 触发网络请求
      cy.get('.network-btn').click()

      // 等待并验证请求
      cy.wait('@getComment').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    })
  })

  describe('页面元素交互测试', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/actions')
    })

    it('应该能够执行各种鼠标操作', () => {
      // 点击操作
      cy.get('.action-btn').click()

      // 双击操作
      cy.get('.action-btn').dblclick()

      // 右键点击
      cy.get('.action-btn').rightclick()

      // 悬停操作
      cy.get('.action-btn').trigger('mouseover')
    })

    it('应该能够处理滚动操作', () => {
      // 滚动到指定元素
      cy.get('#scroll-horizontal button').scrollIntoView()

      // 验证元素可见
      cy.get('#scroll-horizontal button').should('be.visible')

      // 滚动到页面底部
      cy.scrollTo('bottom')

      // 滚动到页面顶部
      cy.scrollTo('top')
    })
  })

  describe('断言和验证', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/assertions')
    })

    it('应该验证各种元素属性', () => {
      // 验证文本内容
      cy.get('.assertion-table')
        .find('tbody tr')
        .first()
        .should('contain', 'Column')

      // 验证CSS类
      cy.get('.assertion-table')
        .should('have.class', 'table')

      // 验证属性
      cy.get('.assertion-table')
        .should('have.attr', 'id')

      // 验证可见性
      cy.get('.assertion-table').should('be.visible')

      // 验证元素数量
      cy.get('.assertion-table tbody tr').should('have.length.greaterThan', 0)
    })

    it('应该能够进行自定义断言', () => {
      cy.get('.assertion-table tbody tr').should(($rows) => {
        // 自定义断言逻辑
        expect($rows).to.have.length.greaterThan(0)
        expect($rows.eq(0)).to.contain('Column')
      })
    })
  })
})
