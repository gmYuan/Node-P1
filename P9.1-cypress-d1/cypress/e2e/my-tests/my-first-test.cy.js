/// <reference types="cypress" />

// 我的第一个自定义测试

describe('我的第一个测试-测试百度', () => {
  it('能搜索学习网站', () => {
    cy.visit('https://www.baidu.com')
    cy.get('div#chat-input-area').type('饥人谷')
    cy.contains('百度一下').click()
    cy.wait(1000)
    cy.contains('饥人谷官网').should('exist')
    cy.contains('新·C++体系课').should('exist')
  });
})

