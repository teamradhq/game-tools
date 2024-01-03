describe('game scoreboard', () => {
  beforeEach(() => {
    cy.visit('/game-scoreboard');
  });

  it('should link to home page', () => {
    cy.contains('Home Page').click();
    cy.location('pathname').should('eq', '/');
  });
});
