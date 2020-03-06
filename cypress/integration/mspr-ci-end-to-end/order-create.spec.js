/// <reference types="cypress" />

const date = Cypress.moment()
const todaysDate = date.format('YYYY-MM-DD')
const todaysDateInTab = date.format("MMM DD, YYYY")



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

  it('Good Form', () => {
    //form good
    cy.get('#jh-create-entity').click()
    cy.get('#field_productName').type('Jet ski').should('have.value', 'Jet ski')
    cy.get('#field_quantity').type('100').should('have.value', '100')
    cy.get('#field_price').type('10').should('have.value', '10')
    cy.get('#field_buyerName').type('amazon').should('have.value', 'amazon')
    cy.get('#field_date').type(todaysDate).should('have.value', todaysDate)
    cy.get('#save-entity').click()

    //verification data
    cy.get('jhi-order').find('tr').last().find('td').eq(1).should('have.text', 'Jet ski')
    cy.get('jhi-order').find('tr').last().find('td').eq(2).should('have.text', '100')
    cy.get('jhi-order').find('tr').last().find('td').eq(3).should('have.text', '10')
    cy.get('jhi-order').find('tr').last().find('td').eq(4).should('have.text', 'amazon')
    cy.get('jhi-order').find('tr').last().find('td').eq(5).should('have.text', todaysDateInTab)

    //supression des données
    cy.get('jhi-order').find('tr').last().find('td').eq(6).find('.btn-danger').click()
    cy.get('#jhi-confirm-delete-order').click()
  })

  it('Form error number', () => {
    cy.get('#jh-create-entity').click()
    cy.get('#field_productName').type('Jet ski').should('have.value', 'Jet ski')
    cy.get('#field_quantity').type('bonjour').should('have.value', '')
    cy.get('#field_price').type('e').should('have.value', '')
    cy.get('#field_buyerName').type('amazon').should('have.value', 'amazon')
    cy.get('#field_date').type(todaysDate).should('have.value', todaysDate)
    cy.get('#save-entity > span').should('not.contain', 'Disabled')
    cy.get('#cancel-save').click()
  })

  it('Form error date', () => {
    cy.get('#jh-create-entity').click()
    cy.get('#field_productName').type('Jet ski').should('have.value', 'Jet ski')
    cy.get('#field_quantity').type('100').should('have.value', '100')
    cy.get('#field_price').type('10').should('have.value', '10')
    cy.get('#field_buyerName').type('amazon').should('have.value', 'amazon')
    cy.get('#field_date').type(todaysDateInTab).should('have.value', todaysDateInTab)
    cy.get('#save-entity > span').should('not.contain', 'Disabled')
    cy.get('#cancel-save').click()
  })
})
