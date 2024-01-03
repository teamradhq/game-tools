describe('app activation', () => {
  it('should load the page', () => {
    cy.visit('/');
    cy.contains('Game Tools');
  });

  it('should display link to scoreboard', () => {
    cy.visit('/');
    cy.contains('Scoreboard').click();
    cy.location('pathname').should('eq', '/game-scoreboard');
  });

  it('should display link to timer', () => {
    cy.visit('/');
    cy.contains('Timer').click();
    cy.location('pathname').should('eq', '/game-timer');
  });

  it('should not link to itself', () => {
    cy.visit('/');
    cy.contains('Game Tools');
    cy.get('a[href="/"]').should('not.exist');
  });
});
