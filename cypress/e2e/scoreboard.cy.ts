describe('game scoreboard', () => {
  beforeEach(() => {
    cy.visit('/game-scoreboard');
  });

  it('should link to home page', () => {
    cy.hasHomePageLink();
  });

  it.only('should display settings', () => {
    cy.get('.mantine-Drawer-overlay').should('not.exist');
    cy.get('[data-testId="gameScoreboard-settingsButton"]').click();
    cy.get('.mantine-Drawer-overlay').should('exist');
    Cypress._.times(4, (i) => {
      cy.get('[data-testid="player-setting"]').eq(i).should('exist');
    });

    cy.get('button.mantine-Drawer-close').click();
    cy.get('.mantine-Drawer-overlay').should('not.exist');
  });

  it('should display the scoreboard', () => {
    cy.contains('Scores');
  });

  it('should display game summary', () => {
    cy.contains('Summary');
    cy.get('[data-testid="game-timer"]').should('exist');
  });
});
