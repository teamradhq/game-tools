describe('app activation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page', () => {
    cy.contains('Game Tools');
  });

  it('should display links to tools', () => {
    Cypress._.each(
      [
        ['Timer', '/game-timer'],
        ['Scoreboard', '/game-scoreboard'],
      ],
      ([tool, pathname]) => {
        cy.visit('/');
        cy.contains(tool).click();
        cy.location('pathname').should('eq', pathname);
      }
    );
  });

  it('should not link to itself', () => {
    cy.hasNoHomePageLink();
  });
});
