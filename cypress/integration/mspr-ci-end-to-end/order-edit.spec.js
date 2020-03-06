/// <reference types="cypress" />

const date = Cypress.moment()
const todaysDate = date.format('YYYY-MM-DD')
const todaysDateInTab = date.format("MMM DD, YYYY")

const field_productName = 'thinkpad carbon x1'
const field_quantity = '1'
const field_price = '1000'
const field_buyerName = 'Lenovo'
const field_date = '2020-02-28'


context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/order')

    // authentification
    cy.get('#username')
      .type('user').should('have.value', 'user')

    cy.get('#password')
      .type('user').should('have.value', 'user')

    cy.get('.btn').click()
  })

  it('Edit with the dashboard', () => {
    //edition
    cy.get('jhi-order').find('tr').last().find('td').eq(6).find('.btn-primary').click()

    cy.get('#field_productName').clear().type(field_productName)
    cy.get('#field_quantity').clear().type(field_quantity)
    cy.get('#field_price').clear().type(field_price)
    cy.get('#field_buyerName').clear().type(field_buyerName)
    cy.get('#field_date').clear().type(field_date)
    cy.get('#save-entity').click()

    cy.get('jhi-order').find('tr').last().find('td').eq(1).should('have.text', field_productName)
    cy.get('jhi-order').find('tr').last().find('td').eq(2).should('have.text', field_quantity)
    cy.get('jhi-order').find('tr').last().find('td').eq(3).should('have.text', field_price)
    cy.get('jhi-order').find('tr').last().find('td').eq(4).should('have.text', field_buyerName)
  })
})
