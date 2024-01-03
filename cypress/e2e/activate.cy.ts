describe('app activation', () => {
  it('should load the page', () => {
    cy.visit('/');
    cy.contains('Game Tools');
  });

  it('should display link to timer', () => {
    cy.visit('/');
    cy.contains('Timer').click();
    cy.location('pathname').should('eq', '/game-timer');
  });
});
