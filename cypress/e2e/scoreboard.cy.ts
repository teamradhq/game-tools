describe('game scoreboard', () => {
  beforeEach(() => {
    cy.visit('/game-scoreboard');
  });

  it('should link to home page', () => {
    cy.hasHomePageLink();
  });

  it('should list players', () => {
    cy.contains('Players');

    Cypress._.times(5, (i) => {
      cy.get('[data-testid="player-name"]')
        .eq(i - 1)
        .should('exist');
    });

    cy.contains('Edit Players');
  });

  it('should display the scoreboard', () => {
    cy.contains('Scores');
  });

  it('should display game summary', () => {
    cy.contains('Summary');
    cy.contains('0:10');
  });
});
