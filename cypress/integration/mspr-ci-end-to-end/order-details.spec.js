/// <reference types="cypress" />

const date = Cypress.moment()
const todaysDate = date.format('YYYY-MM-DD')
const todaysDateInTab = date.format("MMM DD, YYYY")

// const Price	
// const Buyer 
// const Name	
// const Date	

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

  it('Get details', () => {
    var span = 2
    for (let index = 1; index < 6; index++) {
      cy.get('jhi-order').find('tr').last().find('td').eq(index).invoke('text')  // for input or textarea, .invoke('val')
      .then(text => {
        cy.get('jhi-order').find('tr').last().find('td').eq(6).find('.btn-info').click()
        if (span != 6){
          cy.get(':nth-child('+ span + ') > span').should('have.text', text)
        }else{
          cy.get('.row-md > :nth-child(6) > span').should('have.text', text)
        }
        span+=2
      });
      cy.get('.btn-info > .ng-fa-icon > .svg-inline--fa').click()      
    }
  })
})
