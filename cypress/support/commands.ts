/// <reference types="cypress" />

export function hasHomePageLink(): void {
  cy.contains('Home Page').click();
  cy.location('pathname').should('eq', '/');
}
Cypress.Commands.add('hasHomePageLink', hasHomePageLink);

export function hasNoHomePageLink(): void {
  cy.get('a[href="/"]').should('not.exist');
}
Cypress.Commands.add('hasNoHomePageLink', hasNoHomePageLink);

declare global {
  namespace Cypress {
    // noinspection JSUnusedGlobalSymbols
    interface Chainable {
      /**
       * Assert that the home page link exists and is clickable.
       */
      hasHomePageLink(): Chainable;

      /**
       * Assert that the home page link does not exist.
       */
      hasNoHomePageLink(): Chainable;
    }
  }
}
